# Gera um personagem MakeHuman (CC0) via MPFB e exporta GLB leve para o jogo.
import bpy, sys, os, json, glob
args=json.loads(sys.argv[sys.argv.index('--')+1])
P='bl_ext.user_default.mpfb.services.'
import importlib
HS=importlib.import_module(P+'humanservice').HumanService
TS=importlib.import_module(P+'targetservice').TargetService
LS=importlib.import_module(P+'locationservice').LocationService
XS=importlib.import_module(P+'exportservice').ExportService
for o in list(bpy.data.objects):bpy.data.objects.remove(o,do_unlink=True)
U=LS.get_user_data()
def f(kind,name,ext='mhclo'):
    c=glob.glob(os.path.join(U,kind,name,'*.'+ext))
    if not c: raise SystemExit('nao achei '+kind+'/'+name)
    return c[0]
macro=TS.get_default_macro_info_dict()
for k,v in args['macro'].items():
    if k=='race':macro['race'].update(v)
    else: macro[k]=v
bm=HS.create_human(macro_detail_dict=macro,feet_on_ground=True)
rig=HS.add_builtin_rig(bm,'game_engine')
HS.set_character_skin(f('skins',args['skin'],'mhmat'),bm,skin_type='GAMEENGINE',material_instances=False)
def add(path,typ,sub=0):
    return HS.add_mhclo_asset(path,bm,asset_type=typ,subdiv_levels=sub,material_type='GAMEENGINE')
HAIRONLY=args.get('haironly',False)
if not HAIRONLY:
    add(glob.glob(os.path.join(U,'eyes','low-poly','*.mhclo'))[0],'Eyes')
if not HAIRONLY:
    add(f('eyebrows',args.get('eyebrows','eyebrow001')),'Eyebrows')
    add(f('eyelashes',args.get('eyelashes','eyelashes01')),'Eyelashes')
if args.get('hair'):add(f('hair',args['hair']),'Hair')
for c in args.get('clothes',[]):add(f('clothes',c),'Clothes')
TS.bake_targets(bm)
# alvos de rosto como morphs (o editor do jogo mexe neles): largura do rosto, maxilar, nariz, olhos
MD=LS.get_mpfb_data('targets')
def T(rel):return os.path.join(MD,rel+'.target.gz')
MORPHS={'fw+':['head/head-scale-horiz-incr'],'fw-':['head/head-scale-horiz-decr'],'jaw+':['chin/chin-width-incr'],'jaw-':['chin/chin-width-decr'],
  'nose+':['nose/nose-volume-incr'],'nose-':['nose/nose-volume-decr'],'eyes+':['eyes/l-eye-scale-incr','eyes/r-eye-scale-incr'],'eyes-':['eyes/l-eye-scale-decr','eyes/r-eye-scale-decr']}
if not HAIRONLY:
    if not bm.data.shape_keys: bm.shape_key_add(name='Basis',from_mix=False)
    for mname,rels in MORPHS.items():
        tmp=[TS.load_target(bm,T(r),weight=0.0,name='tmp_'+mname+str(i)) for i,r in enumerate(rels)]
        for k in bm.data.shape_keys.key_blocks:k.value=0.0
        for k in tmp:k.value=1.0
        nk=bm.shape_key_add(name=mname,from_mix=True);nk.value=0.0
        for k in tmp:bm.shape_key_remove(k)
# malha mais leve para celular: roupas, sapatos e cabelo simplificados (o corpo/rosto fica com o detalhe)
for o in list(bpy.data.objects):
    if o.type!='MESH' or o.name=='Human' or any(k in o.name for k in ('eyebrow','eyelash','low-poly')):continue
    n=len(o.data.vertices);shoe=any(k in o.name.lower() for k in ('shoe','boot','flat','stiletto'));hair=o.name.replace('Human.','') ==args.get('hair')
    tgt=900 if shoe else 2200 if hair else 3600
    if n>tgt:
        m=o.modifiers.new('decimar','DECIMATE');m.ratio=max(.08,tgt/n);m.use_collapse_triangulate=False
        bpy.context.view_layer.objects.active=o
        while o.modifiers.find('decimar')>0: bpy.ops.object.modifier_move_up(modifier='decimar')
XS.bake_modifiers_remove_helpers(bm,bake_masks=True,bake_subdiv=False,remove_helpers=True)
if HAIRONLY:
    for o in list(bpy.data.objects):
        if o.type=='MESH' and o.name=='Human':bpy.data.objects.remove(o,do_unlink=True)
# texturas menores (o celular agradece)
skinimg=set()
for mat in bpy.data.materials:
    if mat.name.endswith('.body') and mat.use_nodes:
        for n in mat.node_tree.nodes:
            if n.type=='TEX_IMAGE' and n.image: skinimg.add(n.image.name)
for im in bpy.data.images:
    mx=args.get('tex',1024) if im.name in skinimg else args.get('tex2',512)
    if im.size[0]>mx or im.size[1]>mx:
        s=mx/max(im.size[0],im.size[1]);im.scale(max(1,int(im.size[0]*s)),max(1,int(im.size[1]*s)))
import re as _re
for mat in bpy.data.materials:
    if not mat.use_nodes: continue
    cut=bool(_re.search(r'eyebrow|eyelash|hair|short0|long0|bob|ponytail|braid|afro|bun',mat.name,_re.I)) or any(h in mat.name for h in args.get('hairnames',[]))
    for n in mat.node_tree.nodes:
        if n.type=='BSDF_PRINCIPLED':
            a=n.inputs['Alpha']
            if not cut:
                for l in list(a.links):mat.node_tree.links.remove(l)
                a.default_value=1.0
    try: mat.blend_method='CLIP' if cut else 'OPAQUE'
    except Exception: pass
stats={o.name:(len(o.data.vertices) if o.type=='MESH' else 0) for o in bpy.data.objects}
print('STATS',json.dumps(stats))
bpy.ops.export_scene.gltf(filepath=args['out'],export_format='GLB',export_apply=True,export_image_format='JPEG',export_jpeg_quality=args.get('q',82),
  export_skins=True,export_animations=False,export_morph=True,export_morph_normal=False,export_try_sparse_sk=True,export_yup=True,export_texcoords=True,export_normals=True,export_tangents=False)
print('DONE',os.path.getsize(args['out']))
