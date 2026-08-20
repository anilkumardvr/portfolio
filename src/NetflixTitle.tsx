import React, { useEffect, useRef, useState } from 'react';
import './NetflixTitle.css';
import netflixSound from './netflix-sound.mp3';
import { useNavigate } from 'react-router-dom';

// Total time (ms) the transition plays before we route to /browse.
// Matches the ident's own internal choreography 1:1 (V4 ident, 9.6s).
const TRANSITION_MS = 9600;
const DURATION = TRANSITION_MS / 1000;

const NAME = 'ANIL DEVANDLA';
// Index (can be fractional) of the point every letter converges toward.
const CONVERGE_CENTER = (NAME.length - 1) / 2;

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}
function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
/* Quintic smootherstep — matches the V4 ident's easing shape. */
function smoother(a: number, b: number, x: number) {
  x = clamp((x - a) / (b - a));
  return x * x * x * (x * (x * 6 - 15) + 10);
}
/* deterministic pseudo random, seeded the same way as the V4 ident source */
function pseudoRandom(i: number) {
  const z = Math.sin(i * 127.1 + 311.7) * 43758.5453123;
  return z - Math.floor(z);
}
type RGB = [number, number, number];
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/* Ident palette — red/orange core sweeping through magenta, violet and blue. */
const IDENT_PALETTE: RGB[] = [
  [255, 15, 8], [255, 38, 10], [255, 75, 14], [255, 125, 28], [255, 185, 65],
  [245, 28, 70], [255, 35, 112], [215, 45, 145], [145, 45, 170], [90, 55, 195],
  [55, 70, 220], [25, 105, 245], [12, 150, 255], [15, 205, 255],
];

function identFont(size: number) {
  return `900 ${size}px "Arial Narrow","Helvetica Neue Condensed","Roboto Condensed",Impact,Arial,sans-serif`;
}

type Column = { px: number; segs: [number, number][] };
type FieldParticle = {
  u: number;
  width: number;
  alpha: number;
  phase: number;
  drift: number;
  hot: number;
  ci: number;
  gap: number;
};

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

  // Drives the cinematic light-ident: title reveal -> letter-fiber zoom ->
  // fullscreen spectral field -> single beam sweeping off-screen.
  useEffect(() => {
    if (!isClicked) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let rafId = 0;
    let fs = 100;
    let columns: Column[] = [];
    let field: FieldParticle[] = [];
    const start = performance.now();

    function build() {
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = W;
      maskCanvas.height = H;
      const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
      if (!maskCtx) return;

      fs = Math.min(H * 0.205, 176);
      maskCtx.font = identFont(fs);
      while (maskCtx.measureText(NAME).width * 0.88 > W * 0.58 && fs > 28) {
        fs--;
        maskCtx.font = identFont(fs);
      }
      maskCtx.clearRect(0, 0, W, H);
      maskCtx.save();
      maskCtx.translate(W / 2, H / 2);
      maskCtx.scale(0.88, 1);
      maskCtx.font = identFont(fs);
      maskCtx.textAlign = 'center';
      maskCtx.textBaseline = 'middle';
      maskCtx.fillStyle = '#fff';
      maskCtx.fillText(NAME, 0, 0);
      maskCtx.restore();

      const img = maskCtx.getImageData(0, 0, W, H).data;
      columns = [];
      const x0 = Math.max(0, Math.floor(W * 0.17));
      const x1 = Math.min(W - 1, Math.ceil(W * 0.83));
      const y0 = Math.max(0, Math.floor(H / 2 - fs * 0.72));
      const y1 = Math.min(H - 1, Math.ceil(H / 2 + fs * 0.72));
      const step = Math.max(1, Math.floor(W / 1500));
      for (let px = x0; px <= x1; px += step) {
        const segs: [number, number][] = [];
        let inside = false;
        let sy = 0;
        for (let py = y0; py <= y1; py += 2) {
          const on = img[(py * W + px) * 4 + 3] > 25;
          if (on && !inside) {
            inside = true;
            sy = py;
          }
          if (!on && inside) {
            inside = false;
            segs.push([sy, py]);
          }
        }
        if (inside) segs.push([sy, y1]);
        if (segs.length) columns.push({ px, segs });
      }

      // One persistent particle field drives the fullscreen spectral sweep.
      field = Array.from({ length: 620 }, (_, i) => ({
        u: pseudoRandom(i + 11),
        width: 0.22 + Math.pow(pseudoRandom(i * 3 + 19), 2.3) * 7.2,
        alpha: 0.07 + pseudoRandom(i * 5 + 23) * 0.82,
        phase: pseudoRandom(i * 7 + 29) * Math.PI * 2,
        drift: (pseudoRandom(i * 11 + 31) - 0.5) * 0.045,
        hot: pseudoRandom(i * 13 + 37),
        ci: Math.floor(pseudoRandom(i * 17 + 41) * IDENT_PALETTE.length),
        gap: pseudoRandom(i * 19 + 43),
      }));
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, window.innerWidth);
      H = Math.max(1, window.innerHeight);
      canvas!.width = Math.round(W * DPR);
      canvas!.height = Math.round(H * DPR);
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    }
    resize();
    window.addEventListener('resize', resize);

    function drawTitle(t: number) {
      const appear = smoother(0.05, 0.72, t);
      const dissolve = 1 - smoother(1.95, 3.55, t);
      const a = appear * dissolve;
      if (a <= 0.001) return;
      ctx!.save();
      ctx!.translate(W / 2, H / 2);
      ctx!.scale(0.88, 1);
      ctx!.font = identFont(fs);
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      const g = ctx!.createLinearGradient(-W * 0.25, 0, W * 0.25, 0);
      g.addColorStop(0, '#780006');
      g.addColorStop(0.18, '#c90711');
      g.addColorStop(0.48, '#ff1119');
      g.addColorStop(0.72, '#d50812');
      g.addColorStop(1, '#710005');
      ctx!.globalAlpha = a;
      ctx!.shadowColor = 'rgba(229,9,20,.38)';
      ctx!.shadowBlur = 16;
      ctx!.fillStyle = g;
      ctx!.fillText(NAME, 0, 0);
      ctx!.restore();
    }

    function drawLetterFibers(t: number) {
      // Broad overlap: fibers emerge before the solid title fades and remain
      // until the fullscreen field has already taken over.
      const a = smoother(0.85, 2.05, t) * (1 - smoother(4.55, 5.65, t));
      if (a <= 0.001) return;
      const p = smoother(1.75, 5.15, t);
      // Hermite-style camera travel; derivative reaches zero at both ends.
      const zoom = 1 + 12.5 * (p * p * (3 - 2 * p));
      const focusX = W * 0.49;
      const focusY = H * 0.5;
      ctx!.save();
      ctx!.globalCompositeOperation = 'lighter';
      columns.forEach((col, i) => {
        const sx = focusX + (col.px - focusX) * zoom;
        if (sx < -100 || sx > W + 100) return;
        col.segs.forEach((seg, j) => {
          const y1 = focusY + (seg[0] - focusY) * zoom;
          const y2 = focusY + (seg[1] - focusY) * zoom;
          const h = pseudoRandom(i * 29 + j * 17);
          const q: RGB = h > 0.83 ? [255, 112, 30] : h > 0.52 ? [250, 38, 16] : [185, 0, 10];
          const pulse = 0.82 + 0.18 * Math.sin(t * 1.25 + i * 0.07);
          const al = a * (0.16 + pseudoRandom(i * 13 + j * 5) * 0.76) * pulse;
          const lw = (0.3 + pseudoRandom(i * 7 + j) * 1.3) * mix(0.9, 3.8, p);
          ctx!.beginPath();
          ctx!.strokeStyle = rgba(q, al * 0.17);
          ctx!.lineWidth = lw * 5.5;
          ctx!.shadowColor = rgba(q, al * 0.85);
          ctx!.shadowBlur = 10 + 18 * p;
          ctx!.moveTo(sx, y1 - 5 * zoom);
          ctx!.lineTo(sx + (pseudoRandom(i + j) - 0.5) * 1.5 * p, y2 + 5 * zoom);
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.strokeStyle = rgba(q, al);
          ctx!.lineWidth = lw;
          ctx!.shadowBlur = 3 + 8 * p;
          ctx!.moveTo(sx, y1);
          ctx!.lineTo(sx, y2);
          ctx!.stroke();
        });
      });
      ctx!.restore();
    }

    function fieldColor(s: FieldParticle, colorMix: number): RGB {
      const red: RGB = s.hot > 0.72 ? [255, 92, 20] : [205, 5, 12];
      const spectral = IDENT_PALETTE[s.ci];
      return [
        Math.round(mix(red[0], spectral[0], colorMix)),
        Math.round(mix(red[1], spectral[1], colorMix)),
        Math.round(mix(red[2], spectral[2], colorMix)),
      ];
    }

    function drawField(t: number) {
      const a = smoother(3.75, 5.0, t) * (1 - smoother(7.45, 8.55, t));
      if (a <= 0.001) return;
      const expand = smoother(3.65, 6.15, t);
      const colorMix = smoother(4.8, 6.25, t);
      const sweep = smoother(6.45, 8.15, t);
      ctx!.save();
      ctx!.globalCompositeOperation = 'lighter';
      field.forEach((s) => {
        const centered = s.u - 0.5;
        // At first the field is narrow and aligned with the enlarged title
        // fibers, then expands continuously to fullscreen.
        let px = W / 2 + centered * mix(W * 0.07, W * 1.42, expand);
        px += Math.sin(s.phase + t * 0.95) * W * s.drift * expand;
        px += centered * sweep * W * 0.34;
        const q = fieldColor(s, colorMix);
        const al = a * s.alpha * (s.gap < 0.19 ? 0.07 : 1);
        const lw = s.width * mix(0.42, 3.15, expand);
        ctx!.beginPath();
        ctx!.strokeStyle = rgba(q, al * 0.15);
        ctx!.lineWidth = lw * 5.6;
        ctx!.shadowColor = rgba(q, al);
        ctx!.shadowBlur = 12 + lw * 3.1;
        ctx!.moveTo(px, -40);
        ctx!.lineTo(px + Math.sin(s.phase) * 2.5 * sweep, H + 40);
        ctx!.stroke();
        ctx!.beginPath();
        ctx!.strokeStyle = rgba(q, al);
        ctx!.lineWidth = lw;
        ctx!.shadowBlur = 3 + lw * 1.5;
        ctx!.moveTo(px, -20);
        ctx!.lineTo(px, H + 20);
        ctx!.stroke();
        if (s.hot > 0.915) {
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(255,238,224,${al * 0.65})`;
          ctx!.lineWidth = Math.max(0.28, lw * 0.14);
          ctx!.shadowBlur = 2;
          ctx!.moveTo(px, 0);
          ctx!.lineTo(px, H);
          ctx!.stroke();
        }
      });
      ctx!.restore();
    }

    function drawBeam(t: number) {
      const a = smoother(7.85, 8.55, t) * (1 - smoother(9.28, 9.58, t));
      if (a <= 0.001) return;
      const m = smoother(8.35, 9.38, t);
      const px = mix(W * 0.52, W * 1.055, m);
      const bw = mix(W * 0.011, W * 0.19, smoother(8.55, 9.35, t));
      ctx!.save();
      ctx!.globalCompositeOperation = 'lighter';
      const g = ctx!.createLinearGradient(px - bw * 2.8, 0, px + bw * 2.8, 0);
      g.addColorStop(0, 'rgba(70,0,0,0)');
      g.addColorStop(0.3, `rgba(145,0,0,${a * 0.12})`);
      g.addColorStop(0.44, `rgba(255,0,0,${a * 0.45})`);
      g.addColorStop(0.5, `rgba(255,62,10,${a})`);
      g.addColorStop(0.57, `rgba(255,12,0,${a * 0.58})`);
      g.addColorStop(0.76, `rgba(105,0,0,${a * 0.12})`);
      g.addColorStop(1, 'rgba(40,0,0,0)');
      ctx!.fillStyle = g;
      ctx!.fillRect(px - bw * 2.8, 0, bw * 5.6, H);
      ctx!.restore();
    }

    function render(now: number) {
      const t = (now - start) / 1000;
      // Frame blending provides gentle motion blur/trailing instead of a
      // hard clear each frame.
      ctx!.save();
      ctx!.globalCompositeOperation = 'source-over';
      ctx!.fillStyle = t < 0.06 ? '#000' : 'rgba(0,0,0,.84)';
      ctx!.fillRect(0, 0, W, H);
      ctx!.restore();
      drawTitle(t);
      drawLetterFibers(t);
      drawField(t);
      drawBeam(t);
      if (t < DURATION) {
        rafId = requestAnimationFrame(render);
      } else {
        ctx!.fillStyle = '#000';
        ctx!.fillRect(0, 0, W, H);
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
