'use client';

import { useEffect, useRef, useState } from 'react';
import { scrollTo } from '@/lib/lenis';
import { siteConfig } from '@/data/content';
import styles from './Navigator.module.css';

const NAV_ITEMS = siteConfig.navItems;

export default function Navigator({ activeSection }) {
  const lineRef = useRef(null);
  const glowRef = useRef(null);
  const nodeRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // 현재 섹션에 따라 활성 nav 인덱스 결정
  useEffect(() => {
    if (!activeSection) return;
    const idx = NAV_ITEMS.findIndex((item) =>
      item.sections.includes(activeSection)
    );
    if (idx >= 0) setActiveIndex(idx);
  }, [activeSection]);

  // glow 원 위치 이동
  useEffect(() => {
    const node = nodeRefs.current[activeIndex];
    const line = lineRef.current;
    const glow = glowRef.current;
    if (!node || !line || !glow) return;

    const lineRect = line.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const x = nodeRect.left + nodeRect.width / 2 - lineRect.left;

    glow.style.transform = `translateX(${x}px)`;
  }, [activeIndex]);

  const handleNavClick = (item) => {
    const sectionId = item.sections[0];
    const el = document.getElementById(sectionId);
    if (el) scrollTo(el);
  };

  return (
    <nav className={styles.nav} aria-label="Site navigation">
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoText}>지구 끝의 온실</span>
        </div>

        {/* Nav rail */}
        <div className={styles.rail} ref={lineRef}>
          {/* Background line */}
          <div className={styles.line} />

          {/* Glow dot */}
          <div className={styles.glowDot} ref={glowRef} />

          {/* Nav nodes */}
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
              ref={(el) => (nodeRefs.current[i] = el)}
              className={`${styles.node} ${activeIndex === i ? styles.nodeActive : ''}`}
              onClick={() => handleNavClick(item)}
              data-cursor-hover
              aria-label={`Navigate to ${item.label}`}
            >
              <span className={styles.nodeLabel}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Section counter */}
        <div className={styles.counter}>
          <span className={styles.counterText}>
            0{activeIndex + 1} / 0{NAV_ITEMS.length}
          </span>
        </div>
      </div>
    </nav>
  );
}
