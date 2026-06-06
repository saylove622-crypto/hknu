'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/data/content';
import styles from './End.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function End() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 32 });
      gsap.set(glowRef.current, { opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(glowRef.current, {
            opacity: 1, duration: 1.6, ease: 'power2.out',
          });
          tl.to(contentRef.current, {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          }, '-=1');
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="end"
      ref={sectionRef}
      className={styles.section}
      aria-label="End — 구매 링크"
    >
      {/* 배경 glow — hero의 잔향 */}
      <div className={styles.bgGlow} ref={glowRef} />
      <div className={styles.bgNoise} />

      {/* 콘텐츠 */}
      <div className={styles.content} ref={contentRef}>
        <p className={styles.available}>Now Available</p>
        <h2 className={styles.title}>지구 끝의 온실</h2>
        <p className={styles.titleEn}>
          The Greenhouse at the End of the Earth
        </p>

        <div className={styles.divider} />

        <a
          href={siteConfig.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          data-cursor-hover
          aria-label="교보문고에서 구매하기 — 새 탭에서 열림"
        >
          <span>BUY THE BOOK</span>
          <span className={styles.ctaArrow}>→</span>
        </a>

        {/* 작은 메타 */}
        <p className={styles.meta}>
          김초엽 · 아작 · 2021
        </p>
      </div>

      {/* 하단 크레딧 */}
      <div className={styles.credit}>
        <span>Fan Microsite — Non-commercial · 2024</span>
      </div>
    </section>
  );
}
