"""Run: blender -b -t 2 -P tools/bake-character-head.py -- base.obj town/index.html

Only the CC0 MakeHuman body group above the collar is used. Blender is a
development tool. The shipped HTML contains indexed, millimetre-quantized LODs.
"""
import base64
from pathlib import Path
import re
import struct
import sys
import textwrap

import bpy
import bmesh


def read_head(path):
    points, faces = [], []
    group = ''
    for line in path.read_text().splitlines():
        tag, _, value = line.partition(' ')
        if tag == 'v':
            points.append(tuple(map(float, value.split())))
        elif tag == 'g':
            group = value.strip()
        elif tag == 'f' and group == 'body':
            face = [int(corner.split('/')[0]) - 1 for corner in value.split()]
            if any(points[i][1] > 5.92 for i in face):
                faces.append(face)
    used = sorted({i for face in faces for i in face})
    remap = {source: i for i, source in enumerate(used)}
    return [points[i] for i in used], [[remap[i] for i in face] for face in faces]


def bake(points, faces, triangles):
    mesh = bpy.data.meshes.new('MakeHuman collar crop')
    mesh.from_pydata(points, [], faces)
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bmesh.ops.bisect_plane(
        bm, geom=[*bm.verts, *bm.edges, *bm.faces], dist=0.00001,
        plane_co=(0, 5.92, 0), plane_no=(0, 1, 0), clear_inner=True,
    )
    bmesh.ops.triangulate(bm, faces=list(bm.faces))
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new('Auvra head', mesh)
    bpy.context.collection.objects.link(obj)
    decimate = obj.modifiers.new('Character LOD', 'DECIMATE')
    decimate.ratio = min(1.0, triangles / len(mesh.polygons))
    evaluated = obj.evaluated_get(bpy.context.evaluated_depsgraph_get())
    lod = evaluated.to_mesh()
    if not len(lod.vertices) or not len(lod.polygons) or len(lod.vertices) >= 65536:
        raise ValueError('Unexpected LOD size')
    if any(len(face.vertices) != 3 or face.area < 1e-9 for face in lod.polygons):
        raise ValueError('Invalid LOD triangle')
    payload = bytearray(struct.pack('<HH', len(lod.vertices), len(lod.polygons)))
    for v in lod.vertices:
        payload.extend(struct.pack('<hhh', *(round(axis * 1000) for axis in v.co)))
    for f in lod.polygons:
        payload.extend(struct.pack('<HHH', *f.vertices))
    print(f'{len(lod.vertices)} vertices and {len(lod.polygons)} triangles')
    evaluated.to_mesh_clear()
    bpy.data.objects.remove(obj, do_unlink=True)
    bpy.data.meshes.remove(mesh)
    chunks = textwrap.wrap(base64.b64encode(payload).decode(), 112, break_on_hyphens=False)
    return ' +\n'.join(f"    '{chunk}'" for chunk in chunks)


def main():
    source, target = map(Path, sys.argv[sys.argv.index('--') + 1:])
    points, faces = read_head(source)
    data = ',\n'.join(bake(points, faces, tri) for tri in (3600, 900))
    html = target.read_text()
    output, count = re.subn(r'(?<=/\* AVATAR_HEAD_BEGIN \*/\n).*?(?=\n/\* AVATAR_HEAD_END \*/)',
                            f'const HEAD_PACKED=[\n{data}\n];', html, flags=re.S)
    if count != 1:
        raise ValueError('Expected one embedded avatar data block')
    target.write_text(output)


if __name__ == '__main__':
    main()
