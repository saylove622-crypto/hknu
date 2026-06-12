'use client';

import { useEffect, useRef, useCallback } from 'react';
import rough from 'roughjs';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { characterGraph } from '@/data/content';
import styles from './CharacterGraph.module.css';

/* ── 관계 타입별 엣지 색상 ── */
const EDGE_COLOR = {
  special:     '#E91E63',
  conflict:    '#FF5252',
  family:      '#80DEEA',
  transfer:    '#4FC3F7',
  cooperation: '#A5D6A7',
  bond:        'rgba(245,240,232,0.45)',
};

export default function CharacterGraph({ era, selectedId, onNodeClick }) {
  const containerRef  = useRef(null);
  const bgCanvasRef   = useRef(null);   // three.js background
  const svgRef        = useRef(null);   // rough.js edges + outlines
  const wrapRef       = useRef(null);   // CSS 3D transform layer
  const threeRef      = useRef({});

  /* ══════════════════════════════════════════
     three.js — 배경 파티클 (depth atmosphere)
  ══════════════════════════════════════════ */
  useEffect(() => {
    const canvas    = bgCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 500);
    camera.position.z = 7;

    /* 파티클 — 두 색상 혼합 */
    const COUNT = 180;
    const pos   = new Float32Array(COUNT * 3);
    const col   = new Float32Array(COUNT * 3);
    const c1    = new THREE.Color('#4FC3F7');
    const c2    = new THREE.Color('#6B1E5C');
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      const c = Math.random() < 0.65 ? c1 : c2;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.055, vertexColors: true,
      transparent: true, opacity: 0.3,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      points.rotation.y += 0.00018;
      points.rotation.z += 0.00006;
      renderer.render(scene, camera);
    };
    tick();

    threeRef.current = { renderer, camera, raf };

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  /* ══════════════════════════════════════════
     마우스 패럴렉스 — three.js camera + CSS 3D
  ══════════════════════════════════════════ */
  useEffect(() => {
    const el   = containerRef.current;
    const wrap = wrapRef.current;
    if (!el) return;

    const onMove = (e) => {
      const r  = el.getBoundingClientRect();
      const mx = (e.clientX - r.left  - r.width  * 0.5) / r.width;
      const my = (e.clientY - r.top   - r.height * 0.5) / r.height;

      if (wrap) {
        gsap.to(wrap, {
          rotateX: -my * 6, rotateY: mx * 6,
          duration: 0.9, ease: 'power2.out',
        });
      }
      const cam = threeRef.current.camera;
      if (cam) {
        gsap.to(cam.rotation, {
          x: -my * 0.1, y: mx * 0.1,
          duration: 1.2, ease: 'power2.out',
        });
      }
    };

    const onLeave = () => {
      if (wrap) gsap.to(wrap, { rotateX: 0, rotateY: 0, duration: 1.5, ease: 'power3.out' });
      const cam = threeRef.current.camera;
      if (cam) gsap.to(cam.rotation, { x: 0, y: 0, duration: 1.8, ease: 'power3.out' });
    };

    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove',  onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* ══════════════════════════════════════════
     rough.js SVG — 엣지 + 노드 아웃라인
  ══════════════════════════════════════════ */
  const drawGraph = useCallback(() => {
    const svg = svgRef.current;
    const el  = containerRef.current;
    if (!svg || !el) return;

    const W = el.offsetWidth;
    const H = el.offsetHeight;
    svg.setAttribute('width',   String(W));
    svg.setAttribute('height',  String(H));
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    /* 기존 SVG 내용 초기화 */
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rc  = rough.svg(svg);
    const cx  = W / 2;
    const cy  = H / 2;
    const px  = (node) => ({ x: cx + node.pos.x, y: cy + node.pos.y });

    /* 엣지 그리기 */
    characterGraph.edges.forEach((edge) => {
      const fn = characterGraph.nodes.find(n => n.id === edge.from);
      const tn = characterGraph.nodes.find(n => n.id === edge.to);
      if (!fn || !tn) return;

      const active = edge.era.includes(era);
      const f = px(fn), t = px(tn);
      const stroke = active
        ? (EDGE_COLOR[edge.type] || 'rgba(245,240,232,0.4)')
        : 'rgba(245,240,232,0.055)';

      const seed = (fn.id.charCodeAt(0) * 7 + tn.id.charCodeAt(0) * 13) % 97;
      const el2  = rc.line(f.x, f.y, t.x, t.y, {
        roughness:   active ? 1.8 : 1.2,
        strokeWidth: active ? 1.5 : 0.4,
        stroke,
        seed,
      });
      el2.style.opacity = active ? '1' : '0.35';
      el2.style.transition = 'opacity 0.5s';
      svg.appendChild(el2);
    });

    /* 노드 아웃라인은 이제 CSS로 처리하므로 rough.js에서 제외합니다. */
  }, [era]);

  useEffect(() => { drawGraph(); }, [drawGraph]);

  /* 리사이즈 */
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const c   = containerRef.current;
      const thr = threeRef.current;
      if (c && thr.renderer && thr.camera) {
        const W = c.offsetWidth, H = c.offsetHeight;
        thr.renderer.setSize(W, H);
        thr.camera.aspect = W / H;
        thr.camera.updateProjectionMatrix();
      }
      drawGraph();
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [drawGraph]);

  return (
    <div className={styles.root} ref={containerRef}>

      {/* ── Layer 1: three.js background canvas ── */}
      <canvas ref={bgCanvasRef} className={styles.bgCanvas} aria-hidden="true" />

      {/* ── Layer 2 & 3: rough.js SVG + HTML nodes (CSS 3D wrap) ── */}
      <div
        className={styles.graphWrap}
        ref={wrapRef}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* rough.js SVG — pointer-events: none */}
        <svg
          ref={svgRef}
          className={styles.svgLayer}
          aria-hidden="true"
        />

        {/* HTML interactive nodes */}
        {characterGraph.nodes.map((node) => {
          const active   = node.era.includes(era);
          const selected = selectedId === node.id;

          return (
            <button
              key={node.id}
              className={[
                styles.node,
                active   ? styles.nodeOn  : styles.nodeOff,
                selected ? styles.nodeSel : '',
              ].filter(Boolean).join(' ')}
              style={{
                left:      `calc(50% + ${node.pos.x}px)`,
                top:       `calc(50% + ${node.pos.y}px)`,
                transform: `translate(-50%, -50%) translateZ(0px)`,
                '--nc':    node.color,
              }}
              onClick={() => active && onNodeClick(node)}
              disabled={!active}
              aria-label={node.name}
              aria-pressed={selected}
              data-cursor-hover
            >
              <div className={styles.nodeCore}>
                {node.name.split('/').map((part, i) => (
                  <span key={i} className={styles.nodeLbl}>{part.trim()}</span>
                ))}
              </div>
              {/* selected ring */}
              {selected && <div className={styles.nodeRing} />}
            </button>
          );
        })}
      </div>

      {/* 범례 */}
      <div className={styles.legend} aria-hidden="true">
        {Object.entries({ '???': '#E91E63', '갈등': '#FF5252', '가족': '#80DEEA', '제자': '#4FC3F7', '협력': '#A5D6A7', '유대': 'rgba(245,240,232,0.45)' }).map(([k, v]) => (
          <div key={k} className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: v }} />
            <span className={styles.legendLabel}>{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
