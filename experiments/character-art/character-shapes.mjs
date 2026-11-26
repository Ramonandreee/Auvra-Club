// Auvra Club: experimental anatomical surfaces. Three.js is injected by caller.
// Each ring: [y, halfWidth, halfDepth, centerZ]. Bottom to top.
export function loft(THREE, rings, segments = 16) {
  if (rings.length < 2 || !Number.isInteger(segments) || segments < 3) throw new Error('Invalid loft');
  const positions=[], uv=[], indices=[];
  for(let j=0;j<rings.length;j++){
    const [y,w,d,z=0]=rings[j];
    for(let i=0;i<=segments;i++){
      const a=2*Math.PI*i/segments;
      positions.push(w*Math.cos(a),y,z+d*Math.sin(a));
      uv.push(i/segments,j/(rings.length-1));
    }
  }
  const stride=segments+1;
  for(let j=0;j<rings.length-1;j++)for(let i=0;i<segments;i++){
    const a=j*stride+i,b=a+stride;
    indices.push(a,b,a+1,b,b+1,a+1);
  }
  // Close ends with separate vertices so cap normals do not distort the sides.
  for(const j of [0,rings.length-1]){
    const [y,w,d,z=0]=rings[j], center=positions.length/3;
    positions.push(0,y,z);uv.push(.5,.5);
    for(let i=0;i<=segments;i++){
      const a=2*Math.PI*i/segments;
      positions.push(w*Math.cos(a),y,z+d*Math.sin(a));uv.push(.5+.5*Math.cos(a),.5+.5*Math.sin(a));
    }
    for(let i=0;i<segments;i++){
      const a=center+1+i;
      if(j===0)indices.push(center,a,a+1);else indices.push(center,a+1,a);
    }
  }
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  g.setIndex(indices);g.computeVertexNormals();return g;
}
export function headShape(THREE, build='A', segments=24){
  const k=build==='B'?.94:1;
  return loft(THREE,[
    [1.575,.026,.032,.035],[1.592,.047,.052,.025],
    [1.615,.069,.071,.014],[1.642,.084,.084,.005],
    [1.667,.092,.092,0],[1.691,.094,.096,-.004],
    [1.716,.091,.093,-.009],[1.742,.075,.079,-.012],
    [1.765,.043,.047,-.013],[1.773,.006,.008,-.013]
  ].map(([y,w,d,z])=>[y,w*k,d,z]),segments);
}
export function torsoShape(THREE, build='A', suit=false, segments=20){
  const b=build==='B', ease=suit?1.045:1;
  return loft(THREE,[
    [1.075,b?.124:.145,.088,0],[1.13,b?.122:.146,.087,0],
    [1.22,b?.145:.166,.102,.004],[1.32,b?.165:.186,.113,.005],
    [1.40,b?.174:.195,.105,0],[1.445,b?.151:.172,.086,0],
    [1.48,.065,.055,0]
  ].map(([y,w,d,z])=>[y,w*ease,d*ease,z]),segments);
}
export function limbShape(THREE, kind, segments=12){
  const profiles={
    upperArm:[[0,.043,.043],[.07,.047,.046],[.18,.056,.052],[.28,.05,.049]],
    forearm:[[0,.032,.029],[.07,.035,.032],[.19,.045,.041],[.26,.044,.043]],
    thigh:[[0,.061,.06],[.11,.071,.069],[.29,.084,.081],[.44,.082,.079]],
    shin:[[0,.039,.038],[.12,.048,.046],[.29,.065,.059],[.42,.06,.057]]
  };
  if(!profiles[kind])throw new Error('Unknown limb');
  return loft(THREE,profiles[kind],segments);
}
