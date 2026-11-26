#!/usr/bin/env node
/* Simulação headless da economia do town/ (Business Simulator).
 * Extrai o bloco entre @ECON-BEGIN/@ECON-END do HTML, stuba mapa/DOM/rede e joga
 * centenas de partidas com bots de estratégias diferentes.
 * Uso: node tools/sim-town.js [partidas=200] [dias=600]
 * Critérios (CLAUDE.md): sem exceções · progride pelas 5 fases · falência possível, não garantida. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const html=fs.readFileSync(path.join(__dirname,'..','town','index.html'),'utf8');
const a=html.indexOf('/*@ECON-BEGIN*/'),b=html.indexOf('/*@ECON-END*/');
if(a<0||b<0)throw new Error('marcadores @ECON não encontrados');
const econ=html.slice(a,b);
const stubs=`
const MAPW=44,MAPH=44,TILE=48,buildings=[],workers=[];const BSPRITES=new Proxy({},{get:()=>({wt:2,ht:2})});
let __lot=0;function placeBuilding(t,gx,gy){const b={type:t,gx,gy};buildings.push(b);return b}
function spawnWorker(b,co){const w={co:co||null};workers.push(w);return w}
function removeWorker(co){const i=workers.findIndex(w=>w.co===co);if(i>=0)workers.splice(i,1)}
function removeWorkersOf(k,v){for(let i=workers.length-1;i>=0;i--)if(workers[i][k]===v)workers.splice(i,1)}
function findFreeSpot(){return {gx:(__lot++)%40,gy:5}}
function toast(){} function refreshHUD(){} function refreshObj(){} function saveLocal(){} function gameOver(){} function closeModal(){}
const MP={onDay(){},news(){}};
let __choice=()=>0; function modal(i,t,b,acts){} 
`;
const harness=`
${stubs}
${econ}
function eventModal(ico,title,body,choices){const c=choices[__choice(choices.length)];c.fn();checkPhase();}
function bot(strategy){
  // freela até poder fundar
  const act=()=>{
    if(!companies.length){ if(S.cash>=NICHES[0].cost+600){foundCompany(NICHES[0].id,0,0);} else actFreelance(); return; }
    if(S.cash<0&&S.debt<loanLimit())borrow(Math.max(2000,-S.cash+1500));
    if(strategy==='passivo')return;
    if(S.phase<=2&&S.energy>=30)actFreelance();
    const byVal=companies.slice().sort((x,y)=>coValue(y)-coValue(x));
    for(const co of byVal){
      if(co.ops<75&&S.cash>opsCost(co)*3)actImproveOps(co);
      if(S.cash>expandCost(co)*1.4)actExpand(co);
      if(co.employees.length<maxStaff(co)&&totalStaff()<staffCap()){const e=genPerson();const n=NICHE[co.niche];const add=co.baseRev*effScale(co)*e.competence*0.013*roleFit(e,n)*(0.45+co.ops/100*0.95);if(add>e.salary*1.05&&S.cash>e.salary*20)actHire(co,e);}
      if(!co.managed&&co.employees.length>=3&&S.cash>2000)actManager(co);
      if(S.phase>=3&&!co.public&&coValue(co)>=IPO_MIN&&strategy==='agressivo')doIPO(co);
    }
    if(S.phase>=2){const r=rivals.slice().sort((x,y)=>x.value-y.value)[0];if(r&&S.cash>rivalPrice(r)*(strategy==='agressivo'?1.1:1.6))doAcquire(r);}
    const cheapNew=NICHES.filter(n=>!companies.some(c=>c.niche===n.id)&&S.cash>n.cost*4);if(cheapNew.length&&companies.length<3+S.phase*2)foundCompany(cheapNew[cheapNew.length-1].id,0,0);
    if(strategy==='alavancado'&&S.phase>=2&&S.debt<loanLimit()*0.8){borrow(loanLimit()*0.8-S.debt);} 
    if(strategy!=='alavancado'&&S.debt>0&&S.cash>S.debt*2)repay(S.debt);
  };
  act();
}
function run(strategy,days,choiceMode){
  S=newState('bot');companies=[];rivals=[];contacts=[];buildings.length=0;workers.length=0;FEED.length=0;
  for(let i=0;i<7;i++){const r=genRival(NICHES[i],rnd(30000,140000));rivals.push(r);}
  __choice=choiceMode==='aleatorio'?(n=>ri(0,n-1)):(n=>0);
  const ph={1:1};
  for(let d=0;d<days&&!S.over;d++){bot(strategy);endDay();if(!ph[S.phase])ph[S.phase]=S.day;}
  return {over:S.over,day:S.day,phase:S.phase,net:netWorth(),ph,cos:companies.length,debt:S.debt};
}
module.exports={run};
`;
const ctx={console,Math,JSON,Date,module:{exports:{}},Proxy,Object,Array,String,Number};vm.createContext(ctx);
vm.runInContext(harness,ctx,{filename:'town-econ'});
const {run}=ctx.module.exports;
const N=+(process.argv[2]||200),D=+(process.argv[3]||600);let fail=false;
for(const strat of ['passivo','equilibrado','agressivo','alavancado']){
  const rs=[];for(let i=0;i<N;i++)rs.push(run(strat,D,i%2?'aleatorio':'primeira'));
  const bk=rs.filter(r=>r.over).length;
  const avg=k=>{const v=rs.map(r=>r.ph[k]).filter(Boolean);return v.length?Math.round(v.reduce((x,y)=>x+y,0)/v.length)+'d ('+Math.round(v.length/N*100)+'%)':'—';};
  const dead=rs.filter(r=>r.over);const dd=dead.length?' | morre ~dia '+Math.round(dead.reduce((x,r)=>x+r.day,0)/dead.length)+' (fase média '+(dead.reduce((x,r)=>x+r.phase,0)/dead.length).toFixed(1)+')':'';
  console.log(strat.padEnd(12),'falência',String(Math.round(bk/N*100)).padStart(3)+'%','| fase2',avg(2),'| fase3',avg(3),'| fase4',avg(4),'| fase5',avg(5),dd);
  if(strat==='equilibrado'&&!rs.some(r=>r.phase>=5)){console.log('  ✗ nenhum bot equilibrado chegou à fase 5');fail=true;}
  if(strat==='equilibrado'&&bk/N>0.5){console.log('  ✗ falência > 50% no bot equilibrado');fail=true;}
}
const allBk=['passivo','alavancado'].some(()=>true);void allBk;
process.exit(fail?1:0);
