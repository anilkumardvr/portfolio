import React, { useEffect, useRef, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import { useNavigate } from 'react-router-dom';

// Total time (ms) the transition plays before we route to /browse.
// Kept in sync with netflix-sound.mp3 (~3.24s).
const TRANSITION_MS = 3300;
const DURATION = TRANSITION_MS / 1000;
// The canvas ident below was choreographed against a 5.25s timeline; every
// time constant is scaled by this factor so the same beats fit inside
// TRANSITION_MS and stay in sync with the sound effect.
const SCALE = DURATION / 5.25;
const S = (x: number) => x * SCALE;

const NAME = 'ANIL DEVANDLA';
// Index (can be fractional) of the point every letter converges toward —
// the same spot the "N" logo will zoom in from.
const CONVERGE_CENTER = (NAME.length - 1) / 2;

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}
function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function smoothstep(a: number, b: number, x: number) {
  x = clamp((x - a) / (b - a));
  return x * x * (3 - 2 * x);
}
function easeInCubic(x: number) {
  return x * x * x;
}
function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
/* deterministic pseudo random */
function randomFrom(i: number) {
  const x = Math.sin(i * 12412.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}
type RGB = [number, number, number];
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/* Deliberately not a conventional rainbow — includes dark gaps, weighted
   toward red/orange like the real ident. */
const palette: RGB[] = [
  [255, 15, 8], [255, 35, 12], [255, 72, 18], [255, 122, 30],
  [235, 15, 70], [255, 30, 105], [220, 45, 135], [130, 40, 160],
  [75, 65, 205], [25, 85, 230], [15, 125, 255], [15, 195, 255],
  [255, 95, 35], [255, 180, 65], [240, 40, 45],
];

const N_FIBERS = Array.from({ length: 150 }, (_, i) => ({
  u: randomFrom(i * 4),
  width: 0.25 + randomFrom(i * 7) * 2.1,
  alpha: 0.15 + randomFrom(i * 11) * 0.75,
  brightness: randomFrom(i * 17),
}));

const STRANDS = Array.from({ length: 380 }, (_, i) => ({
  baseX: randomFrom(i + 200),
  width: 0.35 + Math.pow(randomFrom(i * 3 + 500), 2.2) * 8,
  alpha: 0.1 + randomFrom(i * 9 + 800) * 0.78,
  palette: Math.floor(randomFrom(i * 13 + 900) * palette.length),
  drift: (randomFrom(i * 17) - 0.5) * 0.06,
  phase: randomFrom(i * 21) * Math.PI * 2,
  bright: randomFrom(i * 25),
}));

const NetflixTitle: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const handleStart = () => {
    if (isClicked) return;
    new Audio(netflixSound).play().catch(console.error);
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => navigate('/browse'), TRANSITION_MS);
      return () => clearTimeout(timer);
    }
  }, [isClicked, navigate]);

  // Drives the cinematic light-ident: solid N reveal -> fiber zoom -> full
  // spectral light field -> single red beam sweeping off-screen.
  useEffect(() => {
    if (!isClicked) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let rafId = 0;
    const start = performance.now();

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = Math.round(W * DPR);
      canvas!.height = Math.round(H * DPR);
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function nMetrics(scale = 1) {
      const h = Math.min(H * 0.41, 355) * scale;
      const w = h * 0.39;
      return { x: W / 2 - w / 2, y: H / 2 - h / 2, w, h, bar: w * 0.27 };
    }
    function createNPath(m: ReturnType<typeof nMetrics>) {
      const p = new Path2D();
      p.rect(m.x, m.y, m.bar, m.h);
      p.rect(m.x + m.w - m.bar, m.y, m.bar, m.h);
      const d = new Path2D();
      d.moveTo(m.x, m.y);
      d.lineTo(m.x + m.bar, m.y);
      d.lineTo(m.x + m.w, m.y + m.h);
      d.lineTo(m.x + m.w - m.bar, m.y + m.h);
      d.closePath();
      p.addPath(d);
      return p;
    }
    function drawSolidN(t: number) {
      const reveal = smoothstep(S(0.08), S(0.46), t) * (1 - smoothstep(S(1.25), S(1.72), t));
      if (reveal <= 0) return;
      const m = nMetrics();
      const n = createNPath(m);
      ctx!.save();
      ctx!.globalAlpha = reveal;
      ctx!.shadowColor = 'rgba(229,9,20,.35)';
      ctx!.shadowBlur = 18;
      const g = ctx!.createLinearGradient(m.x, m.y, m.x + m.w, m.y);
      g.addColorStop(0, '#8e0008');
      g.addColorStop(0.22, '#b20710');
      g.addColorStop(0.49, '#ff1018');
      g.addColorStop(0.68, '#e50914');
      g.addColorStop(1, '#830006');
      ctx!.fillStyle = g;
      ctx!.fill(n);
      ctx!.restore();

      ctx!.save();
      ctx!.globalAlpha = reveal;
      const d = new Path2D();
      d.moveTo(m.x, m.y);
      d.lineTo(m.x + m.bar, m.y);
      d.lineTo(m.x + m.w, m.y + m.h);
      d.lineTo(m.x + m.w - m.bar, m.y + m.h);
      d.closePath();
      const dg = ctx!.createLinearGradient(m.x, m.y, m.x + m.w, m.y + m.h);
      dg.addColorStop(0, '#ff1118');
      dg.addColorStop(0.45, '#f40712');
      dg.addColorStop(1, '#c9000b');
      ctx!.fillStyle = dg;
      ctx!.fill(d);
      ctx!.restore();
    }
    function drawNFibers(t: number) {
      const amount = smoothstep(S(0.72), S(1.35), t) * (1 - smoothstep(S(2.12), S(2.52), t));
      if (amount <= 0) return;
      const push = smoothstep(S(1.35), S(2.45), t);
      const zoom = mix(1, 10.5, easeInCubic(push));
      const m = nMetrics(zoom);
      m.x += W * 0.055 * push;
      m.y += H * 0.04 * push;
      ctx!.save();
      ctx!.clip(createNPath(m));
      ctx!.globalCompositeOperation = 'lighter';
      N_FIBERS.forEach((f, i) => {
        const x = m.x + f.u * m.w + Math.sin(i * 7.13) * m.w * 0.015;
        const c: RGB = f.brightness > 0.82 ? [255, 110, 35] : f.brightness > 0.55 ? [255, 45, 18] : [190, 0, 10];
        ctx!.beginPath();
        ctx!.strokeStyle = rgba(c, amount * f.alpha);
        ctx!.lineWidth = f.width * zoom * 0.35;
        ctx!.shadowColor = rgba(c, 0.7);
        ctx!.shadowBlur = 5 + 12 * push;
        ctx!.moveTo(x, m.y - 30);
        ctx!.lineTo(x + Math.sin(i) * 2 * zoom, m.y + m.h + 30);
        ctx!.stroke();
      });
      ctx!.restore();
    }
    function spectrumColor(s: (typeof STRANDS)[number], t: number): RGB {
      const spectral = smoothstep(S(2.38), S(3.05), t);
      if (spectral < randomFrom(s.palette * 19) * 0.7) {
        return s.bright > 0.72 ? [255, 90, 20] : [220, 8, 15];
      }
      return palette[s.palette];
    }
    function drawSpectrum(t: number) {
      const amount = smoothstep(S(2), S(2.52), t) * (1 - smoothstep(S(3.72), S(4.35), t));
      if (amount <= 0) return;
      const expansion = easeOutCubic(smoothstep(S(2), S(3.15), t));
      const velocity = smoothstep(S(3.15), S(4.2), t);
      ctx!.save();
      ctx!.globalCompositeOperation = 'lighter';
      STRANDS.forEach((s) => {
        const centered = s.baseX - 0.5;
        let x = W / 2 + centered * mix(W * 0.1, W * 1.25, expansion);
        x += Math.sin(s.phase + t * 2) * W * s.drift * expansion;
        x += centered * velocity * W * 0.45;
        const c = spectrumColor(s, t);
        let alpha = amount * s.alpha;
        if (randomFrom(Math.floor(s.baseX * 31)) < 0.24) alpha *= 0.12;
        const width = s.width * mix(0.5, 2.8, expansion);
        ctx!.beginPath();
        ctx!.strokeStyle = rgba(c, alpha * 0.24);
        ctx!.lineWidth = width * 4.5;
        ctx!.shadowColor = rgba(c, alpha);
        ctx!.shadowBlur = 12 + width * 3;
        ctx!.moveTo(x, -40);
        ctx!.lineTo(x + Math.sin(s.phase) * 3 * velocity, H + 40);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.strokeStyle = rgba(c, alpha);
        ctx!.lineWidth = width;
        ctx!.shadowBlur = 4 + width * 1.5;
        ctx!.moveTo(x, -20);
        ctx!.lineTo(x, H + 20);
        ctx!.stroke();
        if (s.bright > 0.89) {
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(255,225,205,${alpha * 0.75})`;
          ctx!.lineWidth = Math.max(0.35, width * 0.17);
          ctx!.shadowBlur = 3;
          ctx!.moveTo(x, 0);
          ctx!.lineTo(x, H);
          ctx!.stroke();
        }
      });
      ctx!.restore();
    }
    function drawFinalBeam(t: number) {
      const show = smoothstep(S(3.92), S(4.25), t) * (1 - smoothstep(S(5.05), S(5.25), t));
      if (show <= 0) return;
      const move = easeInOutCubic(smoothstep(S(4.18), S(5.08), t));
      const x = mix(W * 0.53, W * 1.04, move);
      const bw = mix(W * 0.018, W * 0.19, smoothstep(S(4.52), S(5.1), t));
      ctx!.save();
      ctx!.globalCompositeOperation = 'lighter';
      const glow = ctx!.createLinearGradient(x - bw * 2.5, 0, x + bw * 2.5, 0);
      glow.addColorStop(0, 'rgba(80,0,0,0)');
      glow.addColorStop(0.28, `rgba(150,0,0,${show * 0.16})`);
      glow.addColorStop(0.43, `rgba(255,0,0,${show * 0.5})`);
      glow.addColorStop(0.5, `rgba(255,40,5,${show})`);
      glow.addColorStop(0.57, `rgba(255,15,0,${show * 0.65})`);
      glow.addColorStop(0.75, `rgba(110,0,0,${show * 0.16})`);
      glow.addColorStop(1, 'rgba(50,0,0,0)');
      ctx!.fillStyle = glow;
      ctx!.fillRect(x - bw * 2.5, 0, bw * 5, H);
      const core = ctx!.createLinearGradient(x - bw / 2, 0, x + bw / 2, 0);
      core.addColorStop(0, 'rgba(255,0,0,0)');
      core.addColorStop(0.28, `rgba(255,15,0,${show * 0.65})`);
      core.addColorStop(0.48, `rgba(255,80,15,${show})`);
      core.addColorStop(0.53, `rgba(255,25,0,${show})`);
      core.addColorStop(1, 'rgba(255,0,0,0)');
      ctx!.fillStyle = core;
      ctx!.fillRect(x - bw / 2, 0, bw, H);
      ctx!.restore();
    }
    function drawExposure(t: number) {
      const flash = smoothstep(S(2.75), S(3.05), t) * (1 - smoothstep(S(3.35), S(3.72), t));
      if (flash <= 0) return;
      ctx!.save();
      ctx!.globalCompositeOperation = 'screen';
      ctx!.fillStyle = `rgba(255,45,25,${flash * 0.025})`;
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();
    }

    function render(now: number) {
      const elapsed = (now - start) / 1000;
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = '#000';
      ctx!.fillRect(0, 0, W, H);
      drawSolidN(elapsed);
      drawNFibers(elapsed);
      drawSpectrum(elapsed);
      drawFinalBeam(elapsed);
      drawExposure(elapsed);
      if (elapsed < DURATION) {
        rafId = requestAnimationFrame(render);
      }
    }
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [isClicked]);

  return (
    <div className="netflix-intro-page" onClick={handleStart}>
      <div className={`title-name-wrap ${isClicked ? 'converge-name' : ''}`}>
        <span className="intro-name">
          {NAME.split('').map((ch, i) => {
            const dx = (CONVERGE_CENTER - i) * 0.92;
            return (
              <span
                key={i}
                className="name-letter"
                style={
                  {
                    '--dx': `${dx}em`,
                    animationDelay: `${Math.abs(CONVERGE_CENTER - i) * 0.02}s`,
                  } as React.CSSProperties
                }
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            );
          })}
        </span>
      </div>

      {!isClicked && (
        <div className="scroll-text">
          <span>TAP ANYWHERE TO EXPLORE</span>
        </div>
      )}

      {isClicked && (
        <>
          <canvas ref={canvasRef} className="netflix-ident-canvas" aria-hidden="true" />
          <div className="tudum-blackout" />
        </>
      )}
    </div>
  );
};

export default NetflixTitle;
