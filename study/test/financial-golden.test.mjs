import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

// Test-only numerical oracle: no production pricing or learner-grade engine exists.
// Expected constants are frozen separately with Decimal60, not calculated here.
const root=new URL('../../',import.meta.url);
const fixture=JSON.parse(await readFile(new URL('./financial-golden-fixtures.json',import.meta.url),'utf8'));
const byId=new Map(fixture.cases.map(c=>[c.id,c]));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const sum=values=>values.reduce((total,value)=>total+value,0);
const pv=(cashflows,times,rates)=>sum(cashflows.map((c,i)=>c*Math.exp(-rates[i]*times[i])));
const intrinsic=(type,spot,strike)=>Math.max(type==='call'?spot-strike:strike-spot,0);
const sideSign=side=>{
  assert.ok(side==='long'||side==='short','Explicit long/short side required');
  return side==='long'?1:-1;
};
const variance=(h,rho,spot,futures)=>spot**2+h**2*futures**2-2*h*rho*spot*futures;

function calculate(operation,x){
  switch(operation){
    case 'forwardPayoff':return sideSign(x.side)*x.quantity*(x.spot-x.strike);
    case 'optionPayoff':return intrinsic(x.type,x.spot,x.strike);
    case 'optionProfit':{
      assert.ok(['ignored','continuous'].includes(x.financing),'Premium financing must be stated');
      const premium=x.premium*(x.financing==='ignored'?1:Math.exp(x.rate*x.time));
      return sideSign(x.side)*(intrinsic(x.type,x.spot,x.strike)-premium);
    }
    case 'dailyFutures':return sideSign(x.side)*x.contracts*x.quantity*(x.current-x.previous);
    case 'marginBalance':return x.initial+sum(x.changes);
    case 'effectiveHedgePrice':{
      const gain=sideSign(x.side)*(x.closingFutures-x.initialFutures);
      return x.closingSpot+(x.side==='short'?gain:-gain);
    }
    case 'hedgeRatio':
      assert.ok(x.sigmaFutures>0,'Futures standard deviation must be nonzero');
      assert.ok(Math.abs(x.rho)<=1,'Correlation must lie in [-1,1]');
      return x.rho*x.sigmaSpot/x.sigmaFutures;
    case 'contractCount':return x.ratio*x.exposure/x.contractQuantity;
    case 'betaContracts':return (x.beta-x.target)*x.portfolio/(x.index*x.multiplier);
    case 'accumulation':{
      if(x.convention==='simple')return x.principal*(1+x.rate*x.time);
      if(x.convention==='continuous')return x.principal*Math.exp(x.rate*x.time);
      assert.equal(x.convention,'discrete');
      return x.principal*(1+x.rate/x.frequency)**(x.frequency*x.time);
    }
    case 'discount':return Math.exp(-x.rate*x.time);
    case 'nominalToContinuous':return x.frequency*Math.log1p(x.rate/x.frequency);
    case 'continuousToNominal':return x.frequency*Math.expm1(x.rate/x.frequency);
    case 'growthRate':return Math.log(x.final/x.initial)/(x.months/12);
    case 'effectiveRate':return x.convention==='continuous'?Math.expm1(x.rate):(1+x.rate/x.frequency)**x.frequency-1;
    case 'monthsToYears':return x.months/12;
    case 'basisPoints':return x.basisPoints/10000;
    case 'discreteBond':return sum(x.cashflows.map((c,i)=>c/(1+x.yieldRate/x.frequency)**(x.frequency*x.times[i])));
    case 'spotBond':case 'cashPresentValue':return pv(x.cashflows,x.times,x.rates);
    case 'parYield':return x.frequency*(1-x.discountFactors.at(-1))/sum(x.discountFactors);
    case 'zeroFromDiscount':return -Math.log(x.discountFactor)/x.time;
    case 'bootstrapDiscount':return (x.price-sum(x.earlierCashflows.map((c,i)=>c*x.earlierDiscountFactors[i])))/x.finalCashflow;
    case 'forwardRate':
      assert.ok(x.time2>x.time1,'Forward interval must be strictly positive');
      return (x.rate2*x.time2-x.rate1*x.time1)/(x.time2-x.time1);
    case 'fra':{
      const delta=x.months/12,terminal=x.notional*(x.fixed-x.market)*delta;
      return x.settlement==='terminal'?terminal:terminal/(1+x.market*delta);
    }
    case 'bondMetric':{
      const values=x.cashflows.map((c,i)=>c*Math.exp(-x.yieldRate*x.times[i])),price=sum(values);
      if(x.metric==='price')return price;
      const power=x.metric==='duration'?1:2;
      return sum(values.map((value,i)=>value*x.times[i]**power))/price;
    }
    case 'carryForward':return x.spot*Math.exp((x.rate-x.yieldRate)*x.time);
    case 'carryArbitrage':{
      const fair=x.spot*Math.exp(x.rate*x.time);
      return x.direction==='overpriced'?x.quotedForward-fair:fair-x.quotedForward;
    }
    case 'incomeForward':return (x.spot-pv(x.income,x.incomeTimes,x.incomeRates))*Math.exp(x.rate*x.time);
    case 'forwardValue':return x.spot-x.strike*Math.exp(-x.rate*x.time);
    case 'currencyForward':return x.spot*Math.exp((x.domestic-x.foreign)*x.time);
    case 'currencyArbitrage':return x.foreignBorrow*x.spot*Math.exp(x.domestic*x.time)-x.foreignBorrow*Math.exp(x.foreign*x.time)*x.quotedForward;
    case 'storageForward':return (x.spot+x.storageCash*Math.exp(-x.rate*x.storageTime))*Math.exp(x.rate*x.time);
    case 'commodityForward':return x.spot*Math.exp((x.rate+x.storage-x.convenience)*x.time);
    case 'crossMarketSpread':return x.london*(x.interpretation==='intended-GBP'?x.fx:1)-x.newYork;
    case 'shortShares':return x.quantity*(x.initial-x.final-x.dividend);
    default:assert.fail(`Unknown golden operation ${operation}`);
  }
}
function close(actual,expected,tolerance=1e-8){
  assert.ok(Number.isFinite(actual)&&Number.isFinite(expected),'Finite internal numbers required');
  assert.ok(Math.abs(actual-expected)<=tolerance,`Expected ${expected} ±${tolerance}, received ${actual}`);
}
const value=id=>{
  const c=byId.get(id);
  assert.ok(c,`Missing fixture ${id}`);
  return calculate(c.operation,c.inputs);
};

test('golden examples are citation-bound supplemental oracles, with future lesson binding explicit',()=>{
  assert.equal(fixture.schemaVersion,1);
  assert.match(fixture.lessonBindingStatus,/pending/);
  assert.equal(byId.size,fixture.cases.length,'Unique stable IDs');
  assert.equal(fixture.cases.length,92,'Changes to oracle inventory require deliberate review');
  assert.equal(fixture.cautions.length,6);
  for(const caution of fixture.cautions){
    assert.ok(caution.disposition.length>20,caution.id);
    for(const id of caution.sourceUnitIds)assert.ok(fixture.sources[id],id);
  }
  for(const c of fixture.cases){
    assert.ok(c.derivation.length>0&&c.assumptions.length>0&&c.origin.length>0,c.id);
    assert.ok(c.unit.length>0&&c.sourceUnitIds.length>0,c.id);
    assert.equal(c.absoluteTolerance,1e-8,c.id);
    assert.deepEqual(c.lessonBindings,[],`${c.id}: no invented lesson review`);
    for(const id of c.sourceUnitIds)assert.ok(fixture.sources[id],`${c.id}: missing source ${id}`);
  }
});

test('every cited permitted source unit resolves to the same verified source, locator, normalized page and original image bytes',async()=>{
  const units=JSON.parse(await readFile(new URL('study/sources/units.json',root),'utf8')).units;
  const sources=JSON.parse(await readFile(new URL('study/sources/manifest.json',root),'utf8')).sources;
  const originals=new Map(),pages=new Map(),images=new Map();
  for(const [id,binding] of Object.entries(fixture.sources)){
    const u=units[id];assert.ok(u,id);
    assert.equal(u.status,'verified',id);
    assert.equal(u.classification,'substantive',id);
    assert.equal(u.sourceId,binding.sourceId,id);
    assert.deepEqual(u.locator,binding.locator,id);
    assert.deepEqual(u.extractionRef,binding.extractionRef,id);
    const source=sources[u.sourceId];
    assert.equal(source.exposure.agent,'allow',id);
    assert.equal(source.sha256,binding.originalSha256,id);
    if(!originals.has(source.originalPath))originals.set(source.originalPath,sha(await readFile(new URL(source.originalPath,root))));
    assert.equal(originals.get(source.originalPath),binding.originalSha256,id);
    const p=binding.extractionRef.path;
    if(!pages.has(p))pages.set(p,await readFile(new URL(p,root)));
    assert.equal(sha(pages.get(p)),binding.normalizedSha256,id);
    assert.equal(u.contentHash,binding.normalizedSha256,id);
    assert.ok(pages.get(p).toString('utf8').includes(`<a id="${binding.extractionRef.anchor}"></a>`),id);
    if(!images.has(binding.imagePath))images.set(binding.imagePath,sha(await readFile(new URL(binding.imagePath,root))));
    assert.equal(images.get(binding.imagePath),binding.imageSha256,id);
  }
});
for(const c of fixture.cases)test(`${c.id}: independently frozen ${c.unit} constant`,()=>{
  close(calculate(c.operation,c.inputs),c.expected,c.absoluteTolerance);
});

test('forward and option buyer/writer cashflows negate; loss never requires a negative underlying price',()=>{
  for(const spot of [0,80,100,120,1000]){
    const x={spot,strike:100,quantity:3,side:'long'};
    close(calculate('forwardPayoff',x),-calculate('forwardPayoff',{...x,side:'short'}));
    assert.ok(spot>=0);
    if(spot<100)assert.ok(calculate('forwardPayoff',x)<0);
    for(const type of ['call','put']){
      const o={spot,strike:100,type,premium:7,financing:'ignored',rate:0,time:1,side:'long'};
      close(calculate('optionProfit',o),-calculate('optionProfit',{...o,side:'short'}));
      assert.ok(calculate('optionPayoff',o)>=0);
    }
  }
});

test('premium is outside the maximum and financed-premium convention is not silently substituted',()=>{
  close(value('call-profit-long-80'),-7);
  close(value('call-profit-long-120'),13);
  assert.throws(()=>close(Math.max(80-100-7,0),byId.get('call-profit-long-80').expected));
  assert.ok(value('call-profit-financed-supplement')<13);
  assert.throws(()=>close(value('call-profit-financed-supplement'),13));
});

test('basis sign and hedge direction protect the correct opposite commercial exposures',()=>{
  close(value('basis-effective-short'),51);
  close(value('basis-effective-long'),51);
  assert.throws(()=>close(52+(48-47),51),'Wrong futures-minus-spot basis must fail');
  for(const spot of [40,60]){
    const initial=50;
    // Matched underlying at delivery implies futures=spot; seller shorts, buyer buys.
    close(spot+(initial-spot),50);
    close(spot-(spot-initial),50);
    assert.notEqual(spot+(spot-initial),50,'Reversed sale hedge magnifies rather than offsets');
  }
});

test('London printed currency ambiguity cannot be laundered into an unconditional three-dollar arbitrage',()=>{
  close(value('cross-market-intended-gbp'),3);
  close(value('cross-market-literal-usd'),-50);
  assert.throws(()=>close(value('cross-market-literal-usd'),3));
});

test('daily futures variation cashflows telescope only before financing, and can require margin despite terminal recovery',()=>{
  const x={contracts:2,quantity:100,side:'long'};
  const daily=[calculate('dailyFutures',{...x,previous:52,current:50.5}),calculate('dailyFutures',{...x,previous:50.5,current:52})];
  assert.deepEqual(daily,[-300,300]);
  close(sum(daily),0);
  // Supplemental maintenance1500, initial2000: exactly threshold is not below.
  const needsCall=(balance,maintenance)=>balance<maintenance;
  assert.equal(needsCall(1500,1500),false);
  assert.equal(needsCall(1499,1500),true);
  close(2000-900,1100);
  assert.equal(needsCall(value('margin-balance-source'),1500),true);
  assert.notEqual(daily[0]*Math.exp(.05)+daily[1],0,'Financing daily outflow breaks equality to zero terminal forward payoff');
});

test('minimum variance ratio is not contract count; nearest integer choice is reasoned by residual variance',()=>{
  close(value('minimum-variance-ratio'),.64);
  close(value('minimum-variance-contract-count'),6.4);
  const v6=variance(.6,.8,.2,.25),v7=variance(.7,.8,.2,.25);
  close(variance(.64,.8,.2,.25),.0144);
  close(v6,.0145);close(v7,.014625);
  assert.ok(v6<v7,'Six contracts minimizes model variance among six/seven here; not perfect hedge');
  assert.ok(variance(.64,.8,.2,.25)>0);
  close(calculate('hedgeRatio',{rho:0,sigmaSpot:.2,sigmaFutures:.25}),0);
  close(calculate('hedgeRatio',{rho:-.8,sigmaSpot:.2,sigmaFutures:.25}),-.64);
  assert.throws(()=>calculate('hedgeRatio',{rho:.8,sigmaSpot:.2,sigmaFutures:0}));
  assert.throws(()=>close(.8*.2/(.25**2),.64),'Wrong squared denominator rejected');
  assert.ok(Math.abs(value('airline-contracts-unrounded')-value('airline-contracts-source-rounded-route'))>1e-4);
});

test('beta hedge uses full contract notional and signed-to-short direction, not deposited margin',()=>{
  close(value('beta-target-0'),24);
  close(value('beta-target-0.5'),14);
  close(value('beta-target-1.5'),-6);
  close(1.2-value('beta-target-0.5')*250000/5000000,.5);
  assert.throws(()=>close(1.2*5000000/5000,24),'Using index level without multiplier fails');
});

test('discount/accumulation invert; zero rate and zero remaining time are exact boundaries',()=>{
  close(value('continuous-discount')*value('continuous-accumulation'),1);
  close(calculate('discount',{rate:0,time:20}),1);
  close(calculate('discount',{rate:.05,time:0}),1);
  close(calculate('carryForward',{spot:100,rate:.05,yieldRate:0,time:0}),100);
  close(calculate('forwardValue',{spot:120,strike:100,rate:.05,time:0}),20);
  close(calculate('discount',{rate:-.05,time:2}),Math.exp(.1));
});

test('rate equivalence and months conversion reconstruct growth, rejecting printed source errors and percent confusion',()=>{
  const r=value('growth-continuous-corrected'),nominal=value('growth-semiannual-corrected'),effective=value('growth-effective-corrected');
  close(5000*Math.exp(r*1.5),5800);
  close(5000*(1+nominal/2)**3,5800);
  close(5000*(1+effective)**1.5,5800);
  close(100*r,9.894667007884882);
  close(100*nominal,10.14351489971605);
  close(100*effective,10.400742136017955);
  assert.throws(()=>close(.1015,r));
  assert.throws(()=>close(.1041,nominal));
  assert.throws(()=>close(Math.log(5800/5000)/18,r));
  assert.throws(()=>close(100*Math.exp(5*2),100*value('continuous-accumulation')));
  assert.notEqual(value('one-year-10pct-m1'),value('one-year-10pct-m2'));
  close(100*(1+.1/2)**2,110.25);
});

test('bond par requires matched conventions and zero-curve cashflows use their own dates',()=>{
  close(value('coupon-par-matched-semiannual'),100);
  assert.ok(value('coupon-not-par-unmatched-continuous')<100);
  const x=byId.get('spot-curve-coupon-bond').inputs;
  assert.throws(()=>close(pv(x.cashflows,x.times,x.rates.map(()=>.068)),value('spot-curve-coupon-bond')));
  const par=byId.get('spot-curve-par-yield'),rate=value(par.id),d=par.inputs.discountFactors;
  close(sum(d.map(df=>rate/2*100*df))+100*d.at(-1),100);
  for(const yieldRate of [.01,.05,.1]){
    const low=calculate('discreteBond',{cashflows:[5,105],times:[1,2],frequency:1,yieldRate});
    const high=calculate('discreteBond',{cashflows:[5,105],times:[1,2],frequency:1,yieldRate:yieldRate+.001});
    assert.ok(high<low);
  }
});

test('bootstrap exactly reprices each observed instrument; par-quote bootstrap is a separate supplemental identity',()=>{
  const d=Object.fromEntries([.25,.5,1,1.5,2].map(t=>[t,Math.exp(-value(`bootstrap-lecture-zero-${t}`)*t)]));
  close(100*d[.25],97.5);close(100*d[.5],94.9);close(100*d[1],90);
  close(4*d[.5]+4*d[1]+104*d[1.5],96);
  close(6*d[.5]+6*d[1]+6*d[1.5]+106*d[2],101.6);
  // Supplemental annual par quotes5%,6%: d1=1/1.05, then d2=(1-.06*d1)/1.06.
  const d1=value('par-bootstrap-one-year');
  close(value('par-bootstrap-two-year'),330/371);
  // Correct independent rational: (1 - (6/100)*(20/21))/(106/100) =330/371.
  close(calculate('bootstrapDiscount',{price:100,earlierCashflows:[6],earlierDiscountFactors:[d1],finalCashflow:106}),330/371);
  close(6*d1+106*(330/371),100);
});

test('forward rates reconcile accumulation across disjoint periods, not rate differences alone',()=>{
  close(value('continuous-forward-1-2'),.05);
  close(Math.exp(.03)*Math.exp(value('continuous-forward-1-2')),Math.exp(.04*2));
  close(Math.exp(-.05),Math.exp(-.04*2)/Math.exp(-.03));
  assert.throws(()=>close(.04-.03,.05));
  assert.throws(()=>calculate('forwardRate',{time1:1,time2:1,rate1:.03,rate2:.04}));
});

test('FRA receive-fixed sign, start-date discount and time fraction cannot be replaced by continuous settlement',()=>{
  close(value('fra-receive-fixed-terminal'),-125000);
  close(value('fra-receive-fixed-start')*(1+.045*.25),-125000);
  assert.throws(()=>close(-125000*Math.exp(-.045*.25),value('fra-receive-fixed-start')));
  assert.throws(()=>close(100000000*(.045-.04)*.25,-125000));
});

test('duration and convexity agree with a second independent small-yield numerical derivative',()=>{
  const x=byId.get('sensitivity-price').inputs,h=1e-4;
  const price=y=>pv(x.cashflows,x.times,x.times.map(()=>y));
  const p=price(.12),down=price(.12-h),up=price(.12+h);
  close(-(up-down)/(2*h)/p,value('sensitivity-duration'),1e-7);
  close((up-2*p+down)/(h*h)/p,value('sensitivity-convexity'),2e-7);
  const zero={cashflows:[100],times:[10],yieldRate:.05};
  close(calculate('bondMetric',{...zero,metric:'duration'}),10);
  close(calculate('bondMetric',{...zero,metric:'convexity'}),100);
  const dy=.01,d=value('sensitivity-duration'),c=value('sensitivity-convexity');
  const first=p*(1-d*dy),second=p*(1-d*dy+.5*c*dy**2),exact=value('bond-reprice-.01');
  assert.ok(exact>first,'Convex price curve lies above tangent');
  assert.ok(Math.abs(second-exact)<Math.abs(first-exact));
  assert.notEqual(second,exact,'Second order is an approximation, not exact repricing');
});

test('seminar2 Q7 preserves both conditional conventions and refuses a unique fractional annual schedule claim',()=>{
  const annual=value('seminar2-q7-annual-one-year'),semi=value('seminar2-q7-semiannual-one-year');
  close(106*Math.exp(-annual),101.5);
  close(3*.97+103*Math.exp(-semi),101.5);
  assert.ok(Math.abs(annual-semi)>1e-4);
  const d15=Math.exp(-1.5*value('seminar2-q7-semiannual-one-point-five'));
  close(4*.97+4*Math.exp(-semi)+104*d15,104);
  assert.equal(byId.has('seminar2-q7-annual-one-point-five'),false,'No invented unique annual fractional-maturity answer');
});

test('carry replication separates income, yield, currency direction, storage dates and existing contract value',()=>{
  close(value('known-coupon-income-forward'),900*Math.exp(.03)-40*Math.exp(.02));
  const fair=value('forward-overpriced-fair');
  close(value('arbitrage-overpriced')+fair,43);
  close(value('arbitrage-underpriced')+39,fair);
  close(value('cash-storage-forward'),450*Math.exp(.07)+2);
  assert.throws(()=>close((450+2)*Math.exp(.07),value('cash-storage-forward')));
  const fx=value('currency-covered-parity');
  close(fx*Math.exp(.03*2),.98*Math.exp(.01*2));
  close(calculate('currencyForward',{spot:1/.98,domestic:.03,foreign:.01,time:2}),1/fx);
  assert.ok(fx<.98);
  const forward=value('existing-forward-market-price');
  close((forward-24)*Math.exp(-.05),value('existing-forward-long-value'));
  assert.throws(()=>close(forward,value('existing-forward-long-value')));
  close(calculate('forwardValue',{spot:25,strike:forward,rate:.1,time:.5}),0);
});
