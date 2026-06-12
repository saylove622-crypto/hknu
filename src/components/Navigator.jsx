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

  // 네비 클릭: hero:skip 이벤트 발행 후 해당 섹션으로 스크롤
  const handleNavClick = (item) => {
    // 인트로 재생 중이어도 즉시 스킵하고 이동
    window.dispatchEvent(new CustomEvent('hero:skip'));
    const sectionId = item.sections[0];
    const el = document.getElementById(sectionId);
    if (el) {
      // 약간의 딜레이 후 스크롤 (Lenis 재활성화 대기)
      setTimeout(() => scrollTo(el), 80);
    }
  };

  // 로고 클릭: hero 섹션으로 이동 (인트로 재실행)
  const handleLogoClick = () => {
    const hero = document.getElementById('hero');
    if (hero) scrollTo(hero);
  };

  return (
    <nav className={styles.nav} aria-label="Site navigation">
      <div className={styles.inner}>
        {/* Logo — 클릭 시 hero로 이동 */}
        <div className={styles.logo}>
          <button
            className={styles.logoBtn}
            onClick={handleLogoClick}
            data-cursor-hover
            aria-label="홈(Hero)으로 이동"
          >
            <span className={styles.logoText}>지구 끝의 온실</span>
          </button>
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
