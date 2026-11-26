import assert from 'node:assert/strict';
import {loft,headShape,torsoShape,limbShape} from './character-shapes.mjs';
// Minimal geometry adapter: tests topology without downloading Three.js.
class Attribute {
 constructor(a,n){this.array=Float32Array.from(a);this.count=a.length/n;this.itemSize=n}
 getX(i){return this.array[i*3]} getY(i){return this.array[i*3+1]} getZ(i){return this.array[i*3+2]}
 setXYZ(i,x,y,z){this.array.set([x,y,z],i*3)}
}
class Vector3 {constructor(x,y,z){Object.assign(this,{x,y,z})} normalize(){const n=Math.hypot(this.x,this.y,this.z)||1;this.x/=n;this.y/=n;this.z/=n;return this}}
class Geometry {
 attributes={}; setAttribute(k,v){this.attributes[k]=v} setIndex(a){this.index=a}
 computeVertexNormals(){const p=this.attributes.position.array,n=new Float32Array(p.length);
 for(let i=0;i<this.index.length;i+=3){const [a,b,c]=this.index.slice(i,i+3).map(x=>x*3);const u=[p[b]-p[a],p[b+1]-p[a+1],p[b+2]-p[a+2]],v=[p[c]-p[a],p[c+1]-p[a+1],p[c+2]-p[a+2]];const cross=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];for(const j of [a,b,c])for(let k=0;k<3;k++)n[j+k]+=cross[k]}
 for(let i=0;i<n.length;i+=3){const d=Math.hypot(n[i],n[i+1],n[i+2])||1;for(let k=0;k<3;k++)n[i+k]/=d}this.attributes.normal=new Attribute(n,3)}
 computeBoundingSphere(){}
}
const T={BufferGeometry:Geometry,Float32BufferAttribute:Attribute,Vector3};
const cases=[headShape(T,'A'),headShape(T,'B'),...['A','B'].flatMap(b=>[torsoShape(T,b,true),torsoShape(T,b,false)]),...['upperArm','forearm','thigh','shin'].map(k=>limbShape(T,k))];
for(const g of cases){const p=g.attributes.position,n=g.attributes.normal;assert.equal(p.count,n.count);assert.equal(g.attributes.uv.count,p.count);assert.ok(g.index.every(i=>Number.isInteger(i)&&i>=0&&i<p.count));assert.ok(p.array.every(Number.isFinite));assert.ok(n.array.every(Number.isFinite));for(let i=0;i<n.count;i++)assert.ok(Math.abs(Math.hypot(n.getX(i),n.getY(i),n.getZ(i))-1)<1e-5);assert.ok(n.getX(0)>0,'outward side normal');}
assert.throws(()=>loft(T,[[0,1,1],[0,1,1]]));assert.throws(()=>loft(T,[[0,1,1],[1,-1,1]]));assert.throws(()=>limbShape(T,'unknown'));
console.log('OK: '+cases.length+' anatomical meshes; indices, normals, UV and invalid profiles.');
