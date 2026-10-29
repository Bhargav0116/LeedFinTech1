"use client";

import { useEffect, useRef } from "react";

type P4 = [number, number, number, number];
type P2 = { x: number; y: number; z: number };
const edges: Array<[number, number]> = [];
for (let i = 0; i < 16; i++) for (let bit = 0; bit < 4; bit++) {
  const j = i ^ (1 << bit);
  if (i < j) edges.push([i, j]);
}
function rotate(p: P4, a: number, b: number, angle: number): P4 {
  const q: P4 = [...p]; const c = Math.cos(angle); const s = Math.sin(angle);
  q[a] = p[a] * c - p[b] * s; q[b] = p[a] * s + p[b] * c; return q;
}
function project(source: P4, t: number, mx: number, my: number, w: number, h: number): P2 {
  let p = source;
  p = rotate(p, 0, 3, t * .25 + mx * .32);
  p = rotate(p, 1, 3, t * .20 + my * .30);
  p = rotate(p, 2, 3, t * .15);
  p = rotate(p, 0, 1, t * .12 + my * .10);
  p = rotate(p, 1, 2, t * .10 + mx * .08);
  const ws = 3.6 / (3.6 - p[3] * .72);
  const x = p[0] * ws, y = p[1] * ws, z = p[2] * ws;
  const ps = 4.8 / (4.8 - z * .55);
  const scale = Math.min(w, h) * .245;
  return { x: w * .70 + x * ps * scale, y: h * .51 + y * ps * scale, z };
}

export default function TesseractBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const verts: P4[] = Array.from({ length: 16 }, (_, i) => [i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1, i & 8 ? 1 : -1]);
    let w = 1, h = 1, dpr = 1, t = 0, raf = 0, last = 0;
    let tx = 0, ty = 0, mx = 0, my = 0, disposed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => {
      const r = canvas.getBoundingClientRect(); w = Math.max(1, r.width); h = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5); canvas.width = Math.round(w*dpr); canvas.height = Math.round(h*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    };
    const pointer = (e: PointerEvent) => { if (e.pointerType === "touch") return; tx=(e.clientX/w-.5)*2; ty=(e.clientY/h-.5)*2; };
    const leave = () => { tx=0; ty=0; };
    const draw = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(draw);
      if (now-last < 30) return;
      const dt = last ? Math.min((now-last)/1000,.04) : .016; last=now;
      if (!reduced) t += dt;
      mx += (tx-mx)*.035; my += (ty-my)*.035;
      ctx.clearRect(0,0,w,h);

      // Slow-moving ambient lime and teal light fields give the entire page depth.
      const gx = w*(.69 + Math.sin(t*.19)*.055 + mx*.025);
      const gy = h*(.47 + Math.cos(t*.16)*.055 + my*.02);
      const glow = ctx.createRadialGradient(gx,gy,0,gx,gy,Math.max(w,h)*.57);
      glow.addColorStop(0,"rgba(183,218,67,0.17)");
      glow.addColorStop(.34,"rgba(100,157,104,0.075)");
      glow.addColorStop(1,"rgba(100,157,104,0)");
      ctx.fillStyle=glow; ctx.fillRect(0,0,w,h);

      // Layered orbit rings with different speeds create a dimensional energy field.
      ctx.save(); ctx.translate(gx,gy);
      for(let i=0;i<5;i++){
        ctx.save(); ctx.rotate(t*(i%2===0?.055:-.038)+i*Math.PI/5+mx*.12);
        ctx.beginPath(); ctx.ellipse(0,0,Math.min(w,h)*(.25+i*.047),Math.min(w,h)*(.075+i*.017),.20+my*.05,0,Math.PI*2);
        ctx.strokeStyle=i===2?"rgba(148,190,48,.34)":"rgba(94,143,66,.20)";
        ctx.lineWidth=i===2?1.25:.75; ctx.setLineDash(i===1||i===4?[3,9]:[]); ctx.stroke(); ctx.setLineDash([]);
        // Orbiting light points.
        const a=t*(.28+i*.035)+i*1.7; const rx=Math.min(w,h)*(.25+i*.047), ry=Math.min(w,h)*(.075+i*.017);
        const px=Math.cos(a)*rx, py=Math.sin(a)*ry;
        ctx.beginPath();ctx.arc(px,py,2.1+(i%2),0,Math.PI*2);ctx.fillStyle=i%2===0?"rgba(214,251,86,.95)":"rgba(89,190,160,.9)";ctx.shadowBlur=13;ctx.shadowColor="rgba(174,218,63,.9)";ctx.fill();ctx.shadowBlur=0;
        ctx.restore();
      }
      ctx.restore();

      const points = verts.map(v=>project(v,t,mx,my,w,h));
      // Bright outer strokes and crisp inner lines make the rotating hypercube stand out.
      for (const [a,b] of edges) {
        const p=points[a], q=points[b];
        const alpha=Math.max(.22,Math.min(.88,.48+(p.z+q.z)*.085));
        ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
        ctx.strokeStyle=`rgba(151,190,54,${alpha*.30})`;ctx.lineWidth=6;ctx.shadowBlur=19;ctx.shadowColor="rgba(171,220,63,.65)";ctx.stroke();ctx.shadowBlur=0;
        ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
        ctx.strokeStyle=`rgba(111,139,46,${alpha})`;ctx.lineWidth=1.05;ctx.stroke();
        // Small moving highlights travel along each wireframe edge.
        const phase=(t*.22+(a*7+b*3)*.071)%1;
        const hx=p.x+(q.x-p.x)*phase, hy=p.y+(q.y-p.y)*phase;
        ctx.beginPath();ctx.arc(hx,hy,1.8,0,Math.PI*2);ctx.fillStyle="rgba(218,255,113,.94)";ctx.shadowBlur=12;ctx.shadowColor="rgba(196,245,76,.95)";ctx.fill();ctx.shadowBlur=0;
      }
      for(const p of points){
        ctx.beginPath();ctx.arc(p.x,p.y,2.3,0,Math.PI*2);ctx.fillStyle="rgba(215,249,111,.95)";ctx.shadowBlur=14;ctx.shadowColor="rgba(170,211,62,.95)";ctx.fill();ctx.shadowBlur=0;
        ctx.beginPath();ctx.arc(p.x,p.y,5.5,0,Math.PI*2);ctx.strokeStyle="rgba(147,184,53,.26)";ctx.lineWidth=.7;ctx.stroke();
      }
      // Sparse floating particles across the viewport keep the background alive while scrolling.
      for(let i=0;i<34;i++){
        const x=(i*173.3 + Math.sin(t*.22+i*2.4)*24 + w*.07)%(w+20);
        const y=(i*97.7 + Math.cos(t*.18+i*1.9)*28 + t*(5+(i%4)*2))%(h+20);
        const pulse=.45+.55*Math.sin(t*1.4+i*1.7);
        ctx.beginPath();ctx.arc(x,y, .65+(i%3)*.35,0,Math.PI*2);
        ctx.fillStyle=i%5===0?`rgba(88,173,145,${.25+pulse*.35})`:`rgba(139,169,53,${.18+pulse*.38})`;ctx.fill();
      }
    };
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
    window.addEventListener("pointermove",pointer,{passive:true}); window.addEventListener("pointerleave",leave,{passive:true});
    raf=requestAnimationFrame(draw);
    return ()=>{disposed=true;cancelAnimationFrame(raf);ro.disconnect();window.removeEventListener("pointermove",pointer);window.removeEventListener("pointerleave",leave);};
  },[]);
  return <canvas ref={ref} className={`ref-tesseract-background ${className}`} aria-hidden="true" />;
}
