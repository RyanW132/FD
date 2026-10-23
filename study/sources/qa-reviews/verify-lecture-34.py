#!/usr/bin/env python3
"""Recheck frozen independent QA evidence; never generate/rebind approvals.

Visual/semantic review was performed separately by the reviewer using view_image
on every production page. This script proves freshness, source reproduction and
selected numerical identities, not that an image was semantically inspected.
"""
import hashlib
import json
import math
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
HERE = Path(__file__).resolve().parent
checks = []


def digest(data):
    return hashlib.sha256(data).hexdigest()


def check(name, condition, detail=None):
    checks.append({"check": name, "pass": bool(condition), "detail": detail})
    if not condition:
        raise AssertionError(name)


def numeric(name, value, expected, tolerance):
    check(name, abs(value - expected) <= tolerance,
          {"actual": value, "expected": expected, "tolerance": tolerance})


def main():
    baseline = json.loads((HERE / "lecture-34-review-start-bindings.json").read_text())
    manifest = json.loads((ROOT / "study/sources/manifest.json").read_text())
    tools = ROOT / ".omx/tools/poppler/bin"
    # The workstation tool location is explicit, not a project/runtime dependency.
    if len(sys.argv) > 1:
        tools = Path(sys.argv[1]).resolve()
    totals = {"pages": 0, "units": 0, "substantive": 0, "administrative": 0}
    for source_id, frozen in baseline.items():
        for path, sha in frozen["files"].items():
            check("frozen bytes: " + path, digest((ROOT / path).read_bytes()) == sha)
        draft_path = "study/sources/qa-drafts/" + source_id + ".json"
        draft = json.loads((ROOT / draft_path).read_text())
        source = manifest["sources"][source_id]
        check(source_id + " source identity", source["sha256"] == draft["sourceHash"])
        check(source_id + " permitted agent channel", source["access"] == "permitted"
              and source["exposure"]["agent"] == "allow")
        expected_pages = 41 if source_id == "lecture-3" else 32
        check(source_id + " exhaustive physical pages",
              [p["pdfPage"] for p in draft["pages"]] == list(range(1, expected_pages + 1)))
        seen = set()
        for page in draft["pages"]:
            totals["pages"] += 1
            text = (ROOT / page["normalizedPath"]).read_text()
            anchors = list(re.finditer(r'<a id="([^"]+)"></a>', text))
            by_id = {m.group(1): text[m.end():anchors[i+1].start()
                     if i+1 < len(anchors) else len(text)] for i,m in enumerate(anchors)}
            check(page["normalizedPath"] + " unique anchors", len(by_id) == len(anchors))
            for unit in page["units"]:
                totals["units"] += 1
                totals[unit["classification"]] += 1
                check(unit["id"] + " unique source unit", unit["id"] not in seen)
                seen.add(unit["id"])
                check(unit["id"] + " exact source locator/reference/hash",
                      unit["sourceId"] == source_id
                      and unit["locator"]["pdfPage"] == page["pdfPage"]
                      and bool(unit["locator"]["region"])
                      and unit["extractionRef"] == {"kind": "markdown",
                          "path": page["normalizedPath"], "anchor": unit["id"]}
                      and unit["contentHash"] == page["normalizedHash"]
                      and unit["status"] == "needs-review"
                      and unit["id"] in by_id)
                if unit["classification"] == "substantive":
                    span = by_id[unit["id"]]
                    check(unit["id"] + " self-contained source evidence",
                          "**Evidence locator:** " + source_id in span
                          and f"physical PDF page {page['pdfPage']} of {expected_pages}" in span
                          and unit["locator"]["region"] in span
                          and f"../../assets/{source_id}/page-{page['pdfPage']:03d}.png" in span
                          and "Unchanged raw layout extraction" in span)
                    if source_id == "lecture-3" and page["pdfPage"] == 11:
                        check(unit["id"] + " local printed-error correction",
                              all(s in span for s in ["not original slide text", "9.894667007884882",
                                  "10.14351489971605", "10.400742136017955", "10.15%", "10.41%", "not correct answers"]))
                    if source_id == "lecture-3" and page["pdfPage"] == 16:
                        check(unit["id"] + " local matched-convention caveat",
                              all(s in span for s in ["not original slide text", "matched", "continuously compounded", "nominal annual paid semiannually"]))
            # Editorial correction anchors are not original-source unit records.
            extras = set(by_id) - {u["id"] for u in page["units"]}
            expected_extras = ({"lecture-3-p011-labelled-correction"} if source_id == "lecture-3" and page["pdfPage"] == 11
                else {"lecture-3-p016-rate-convention-caution"} if source_id == "lecture-3" and page["pdfPage"] == 16 else set())
            check(page["normalizedPath"] + " only labelled editorial extra anchors", extras == expected_extras)
        with tempfile.TemporaryDirectory(prefix="fd-independent-l34-") as tmp:
            tmp = Path(tmp)
            original = ROOT / source["originalPath"]
            info = subprocess.run([str(tools / "pdfinfo"), str(original)], capture_output=True, check=True).stdout.decode()
            check(source_id + " fresh original PDF metadata", re.search(rf"^Pages:\s+{expected_pages}\s*$", info, re.M) is not None
                  and re.search(r"^Encrypted:\s+no\s*$", info, re.M) is not None)
            subprocess.run([str(tools / "pdftotext"), "-layout", "-enc", "UTF-8", str(original), str(tmp / "full.txt")], capture_output=True, check=True)
            full = (tmp / "full.txt").read_bytes()
            check(source_id + " fresh full raw extraction byte equality", full == (ROOT / f"study/sources/extracted/{source_id}/rawfull-layout.txt").read_bytes())
            chunks = full.decode().split("\f")
            check(source_id + " raw page separation", len(chunks) == expected_pages + 1 and not chunks[-1].strip())
            subprocess.run([str(tools / "pdftoppm"), "-r", "120", "-png", str(original), str(tmp / "page")], capture_output=True, check=True)
            rendered = {int(p.stem.rsplit("-",1)[1]): p for p in tmp.glob("page-*.png")}
            check(source_id + " render membership", set(rendered) == set(range(1, expected_pages + 1)))
            for page in draft["pages"]:
                n = page["pdfPage"]
                check(f"{source_id} page {n} fresh uncropped image byte equality", digest(rendered[n].read_bytes()) == page["imageHash"])
                raw = (ROOT / page["rawPath"]).read_text()
                body = raw.split("```text\n",1)[1].rsplit("\n```\n",1)[0]
                check(f"{source_id} page {n} raw text is original physical page", body == chunks[n-1])
        review_path = HERE / (source_id + ".json")
        if review_path.exists():
            review = json.loads(review_path.read_text())
            check(source_id + " review frozen draft/source/independence", review["sourceHash"] == draft["sourceHash"]
                  and review["draftHash"] == frozen["draftHash"] and review["draftPath"] == draft_path
                  and review["reviewer"] != draft["author"] and review["verdict"] == "approved")
            expected = [{"pdfPage": p["pdfPage"], "verdict": "approved", "rawHash": p["rawHash"],
                         "imageHash": p["imageHash"], "normalizedHash": p["normalizedHash"],
                         "unitIds": [u["id"] for u in p["units"]], "allRegionsAccounted": True}
                        for p in draft["pages"]]
            check(source_id + " exact reviewed page bytes/unit ordering", review["pages"] == expected)

    # Independent arithmetic: verify original printed numbers to their displayed precision.
    e, log = math.exp, math.log
    numeric("L3 p6 annual",100*1.1,110,0.005)
    numeric("L3 p6 semiannual",100*1.05**2,110.25,0.005)
    numeric("L3 p6 continuous",100*e(.1),110.52,0.005)
    numeric("L3 p7 quarterly two-year",1000*1.02**8,1171.66,0.005)
    for m, val in [(1,110),(2,110.25),(4,110.38),(12,110.47),(365,110.52)]:
        numeric(f"L3 p8 m={m}",100*(1+.1/m)**m,val,.005)
    numeric("L3 p8 effective annual percent",100*(1.05**2-1),10.25,1e-10)
    numeric("L3 p10 nominal-to-continuous percent",200*log(1.05),9.758,.0005)
    r=log(5800/5000)/1.5
    numeric("L3 p11 corrected continuous percent",100*r,9.894667007884882,1e-12)
    numeric("L3 p11 corrected nominal semiannual percent",200*(e(r/2)-1),10.14351489971605,1e-12)
    numeric("L3 p11 distinct effective annual percent",100*(e(r)-1),10.400742136017955,1e-12)
    check("L3 p11 preserved printed claims actually incorrect",abs(r-.1015)>.001 and abs(2*(e(.1015/2)-1)-.1041)<.00005)
    numeric("L3 p12 accumulation",100*e(.25),128.40,.005)
    numeric("L3 p12 discounting",100*e(-.25),77.88,.005)
    ts=[.5,1,1.5,2]; rates=[.05,.058,.064,.068]
    dfs=[e(-a*b) for a,b in zip(ts,rates)]
    numeric("L3 p14 bond price",sum(c*p for c,p in zip([3,3,3,103],dfs)),98.39,.005)
    lo,hi=0,.2
    for _ in range(80):
        y=(lo+hi)/2
        if sum(c*e(-y*t) for c,t in zip([3,3,3,103],ts))>98.39:lo=y
        else:hi=y
    numeric("L3 p15 continuous yield percent",100*(lo+hi)/2,6.76,.005)
    numeric("L3 p18 final discount factor",dfs[-1],.87284,.000005)
    numeric("L3 p18 annuity factor",sum(dfs),3.70027,.000005)
    numeric("L3 p18 par coupon percent",200*(1-dfs[-1])/sum(dfs),6.87,.005)
    for T,B,val in [(.25,97.5,10.127),(.5,94.9,10.469),(1,90,10.536)]:
        numeric(f"L3 p21 T={T} zero percent",100*log(100/B)/T,val,.0005)
    d15=(96-4*.949-4*.9)/104
    r15=-log(d15)/1.5
    numeric("L3 p22 discount factor",d15,.85196,.000005)
    numeric("L3 p22 bootstrap rate percent",100*r15,10.681,.0005)
    numeric("L3 p23 bootstrap rate percent",-50*log((101.6-6*.949-6*.9-6*d15)/106),10.808,.0005)
    numeric("L3 p26 forward rate percent",100*(.04*2-.03),5,1e-12)
    numeric("L3 p26 equal terminal value",100*e(.08),108.33,.005)
    for n,z,prev,val in [(2,.04,.03,5),(3,.046,.04,5.8),(4,.05,.046,6.2),(5,.053,.05,6.5)]:
        numeric(f"L3 p27 year {n} forward percent",100*(n*z-(n-1)*prev),val,1e-10)
    numeric("L3 p30 terminal FRA",100000000*(.04-.045)*.25,-125000,1e-8)
    numeric("L3 p30 start FRA",-125000/(1+.045*.25),-123609,.5)
    cfs=[5]*5+[105]; times=[.5,1,1.5,2,2.5,3]
    pvs=[c*e(-.12*t) for c,t in zip(cfs,times)]; B=sum(pvs)
    D=sum(t*p for t,p in zip(times,pvs))/B; C=sum(t*t*p for t,p in zip(times,pvs))/B
    for i,(pv,t,pp,wp) in enumerate(zip(pvs,times,[4.709,4.435,4.176,3.933,3.704,73.256],[.025,.047,.066,.083,.098,2.333])):
        numeric(f"L3 p35 PV row {i+1}",pv,pp,.0005)
        numeric(f"L3 p35 weighted time row {i+1}",t*pv/B,wp,.0005)
    numeric("L3 p35 cashflow total",sum(cfs),130,1e-12)
    numeric("L3 p35 PV total",B,94.213,.0005)
    numeric("L3 p35 duration total",D,2.653,.0005)
    numeric("L3 p38 convexity",C,7.570,.0005)
    for dy,exact,lin,err in [(.001,93.963,93.963,0),(.01,91.749,91.714,.035),(.02,89.354,89.214,.140)]:
        price=sum(c*e(-(.12+dy)*t) for c,t in zip(cfs,times)); linear=B*(1-D*dy)
        numeric(f"L3 p37 {dy} exact",price,exact,.0005)
        numeric(f"L3 p37 {dy} linear",linear,lin,.0005)
        numeric(f"L3 p37 {dy} error",price-linear,err,.0005)
    numeric("L3 p39 quadratic estimate",94.213*(1-.02653+.0003785),91.749,.0005)
    numeric("L4 p6 long net profit",-500*120+500+500*100,-9500,1e-12)
    numeric("L4 p6 short net profit",500*120-500-500*100,9500,1e-12)
    numeric("L4 p8 daily variation",2*100*(50.5-52),-300,1e-12)
    fair=40*e(.05*.25)
    numeric("L4 p12 fair forward",fair,40.50,.005)
    numeric("L4 p12 cash-carry profit",43-fair,2.50,.005)
    numeric("L4 p13 reverse-carry profit",fair-39,1.50,.005)
    I=40*e(-.03*4/12); fair=(900-I)*e(.04*9/12)
    numeric("L4 p16 coupon PV",I,39.60,.005)
    numeric("L4 p16 income forward",fair,886.60,.005)
    numeric("L4 p17 overpriced profit",910-fair,23.40,.005)
    numeric("L4 p17 underpriced profit",fair-870,16.60,.005)
    numeric("L4 p18 yield forward",25*e((.1-.0396)*.5),25.77,.005)
    numeric("L4 p21 forward price",25*e(.1*.5),26.28,.005)
    numeric("L4 p21 forward value",25-24*e(-.1*.5),2.17,.005)
    numeric("L4 p21 rounded-route value",(26.28-24)*e(-.1*.5),2.17,.005)
    numeric("L4 p23 stock index",1300*e((.05-.01)*.25),1313.07,.005)
    numeric("L4 p25 currency forward",.98*e((.01-.03)*2),.9416,.00005)
    usd=980*e(.01*2);aud=1000*e(.03*2)
    numeric("L4 p26 USD investment",usd,999.80,.005)
    numeric("L4 p26 AUD repayment",aud,1061.84,.005)
    numeric("L4 p26 USD forward cost",aud*.93,987.51,.005)
    numeric("L4 p26 profit",usd-aud*.93,12.29,.005)
    numeric("L4 p29 storage PV",2*e(-.07),1.865,.0005)
    numeric("L4 p29 storage forward",450*e(.07)+2,484.63,.005)
    result={"ok":True,"scope":"Frozen lecture-3/4 source QA freshness and reproduction; not teaching readiness", "totals":totals,"checks":checks}
    (HERE / "lecture-34-verification-checks.json").write_text(json.dumps(result,indent=2)+"\n")
    print(json.dumps({"ok":True,"checks":len(checks),"totals":totals}))


if __name__ == "__main__":
    main()
