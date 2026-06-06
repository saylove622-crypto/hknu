'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

const PARTICLE_COUNT = 10;

export default function Cursor() {
  const coreRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const particlePositions = useRef(
    Array.from({ length: PARTICLE_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMove);

    // 클릭 가능한 요소 감지
    const clickables = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, [data-cursor-hover]'
    );
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    // 애니메이션 루프
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      const { x, y } = mouseRef.current;

      // Core — 즉시 추적
      if (coreRef.current) {
        coreRef.current.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
      }

      // Particles — lerp 지연
      particlePositions.current.forEach((pos, i) => {
        const delay = 0.08 + i * 0.022;
        pos.x = lerp(pos.x, x, delay);
        pos.y = lerp(pos.y, y, delay);

        const el = particlesRef.current[i];
        if (el) {
          const size = isHovering ? 4 - i * 0.25 : 3 - i * 0.2;
          const opacity = isHovering ? 0.7 - i * 0.055 : 0.5 - i * 0.04;
          el.style.transform = `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px)`;
          el.style.width = `${Math.max(size, 0.5)}px`;
          el.style.height = `${Math.max(size, 0.5)}px`;
          el.style.opacity = Math.max(opacity, 0);
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovering]);

  return (
    <div className={styles.cursorRoot} aria-hidden="true">
      {/* Core */}
      <div
        ref={coreRef}
        className={`${styles.core} ${isHovering ? styles.coreHover : ''}`}
      />

      {/* Particles */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className={styles.particle}
          style={{ '--index': i }}
        />
      ))}
    </div>
  );
}
