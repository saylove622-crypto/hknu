'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '@/lib/lenis';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const TITLE = '지구 끝의 온실';

// 줌 완료 후 차례대로 표시할 인용구 3개
const QUOTES = [
  '비가 내리고 바람이 부는데도\n그 모든 것이 죽음을 의미하지 않았다.',
  '더스트는 이 마을을 파괴하지 않았다.',
  '이곳은...... 마치 더스트에 완벽하게 적응한 세계처럼\n보였다. 사람들뿐만 아니라 풍경 속의 모든 것들이',
];

export default function Hero() {
  const sectionRef    = useRef(null);
  const bgLayerRef    = useRef(null);
  const fgLayerRef    = useRef(null);
  const titleRef      = useRef(null);
  const subtitleRef   = useRef(null);
  const indicatorRef  = useRef(null);
  const charsRef      = useRef([]);
  const quoteOverRef  = useRef(null);
  const quoteRefs     = useRef([]);
  // 'zoom' | 'quote' | 'done'
  const phaseRef      = useRef('zoom');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 초기 상태 ───────────────────────────────
      gsap.set(charsRef.current,     { opacity: 0, y: 30 });
      gsap.set(subtitleRef.current,  { opacity: 0, y: 16 });
      gsap.set(indicatorRef.current, { opacity: 0 });
      gsap.set(bgLayerRef.current,   { scale: 1 });
      gsap.set(fgLayerRef.current,   { scale: 1.06, opacity: 1 });
      gsap.set(quoteOverRef.current, { opacity: 0 });
      gsap.set(quoteRefs.current,    { opacity: 0 });

      // ── 진입 애니메이션 ─────────────────────────
      const entry = gsap.timeline({ delay: 0.35 });
      entry.to(charsRef.current, {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out',
      });
      entry.to(subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3');
      entry.to(indicatorRef.current,
        { opacity: 1, duration: 0.5 }, '-=0.2');

      // ── 인용구 시퀀스 ────────────────────────────
      const startQuotes = () => {
        if (phaseRef.current !== 'zoom') return;
        phaseRef.current = 'quote';

        const qtl = gsap.timeline({
          onComplete: () => {
            phaseRef.current = 'done';
            // Lenis 재활성화 후 다음 섹션으로
            const lenis = getLenis();
            if (lenis) lenis.start();
            const next = document.getElementById('overview');
            setTimeout(() => {
              if (next && lenis) lenis.scrollTo(next, { duration: 1.4, offset: -40 });
            }, 350);
          },
        });

        // 어두운 오버레이 등장
        qtl.to(quoteOverRef.current,
          { opacity: 1, duration: 1.0, ease: 'power2.out' }, '+=0.25');

        // 인용구 3개 순차 fade in → fade out
        QUOTES.forEach((_, i) => {
          const hold = i === 2 ? 2.8 : 2.2;
          qtl.fromTo(
            quoteRefs.current[i],
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
            i === 0 ? '+=0.15' : '-=0.05'
          );
          qtl.to(quoteRefs.current[i],
            { opacity: 0, y: -12, duration: 0.65, ease: 'power2.in' },
            `+=${hold}`);
        });

        // 오버레이 페이드아웃
        qtl.to(quoteOverRef.current,
          { opacity: 0, duration: 0.75, ease: 'power2.out' }, '+=0.2');
      };

      // ── 줌 패럴렉스 스크롤잭 ──────────────────────
      const TOTAL = window.innerHeight * 1.8;
      let vScroll = 0;
      const zoomState = { p: 0 };

      const applyZoom = (p) => {
        if (bgLayerRef.current)
          gsap.set(bgLayerRef.current, { scale: 1 + p * 0.3, force3D: true });
        if (fgLayerRef.current)
          gsap.set(fgLayerRef.current, {
            scale: 1.06 + p * 0.48,
            opacity: Math.max(0, 1 - p * 1.15),
            force3D: true
          });
        if (titleRef.current)
          gsap.set(titleRef.current, {
            y: p * -52,
            opacity: Math.max(0, 1 - p * 2.0),
            force3D: true
          });
      };

      const stopLenis = () => { const l = getLenis(); if (l) l.stop(); };

      const onWheel = (e) => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top > 10 || rect.bottom <= 0) return;
        if (phaseRef.current === 'done') return;

        // 항상 기본 스크롤 방지 + Lenis 정지
        e.preventDefault();
        stopLenis();

        if (phaseRef.current === 'quote') return; // 인용구 중엔 입력 무시

        vScroll = Math.max(0, Math.min(TOTAL, vScroll + e.deltaY));
        const targetP = vScroll / TOTAL;

        // GSAP 트윈으로 targetP까지 부드럽게 감속 보간
        gsap.to(zoomState, {
          p: targetP,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: () => {
            applyZoom(zoomState.p);
            if (zoomState.p >= 0.99 && phaseRef.current === 'zoom') {
              startQuotes();
            }
          }
        });
      };

      window.addEventListener('wheel', onWheel, { passive: false, capture: true });

      // 터치 지원
      let ty0 = 0;
      const onTS = (e) => { ty0 = e.touches[0].clientY; };
      const onTE = (e) => {
        const dy = ty0 - e.changedTouches[0].clientY;
        if (dy > 60 && phaseRef.current === 'zoom') {
          vScroll = TOTAL;
          gsap.to(zoomState, {
            p: 1,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto',
            onUpdate: () => {
              applyZoom(zoomState.p);
              if (zoomState.p >= 0.99 && phaseRef.current === 'zoom') {
                startQuotes();
              }
            }
          });
        }
      };
      window.addEventListener('touchstart', onTS, { passive: true });
      window.addEventListener('touchend',   onTE, { passive: true });

      return () => {
        window.removeEventListener('wheel', onWheel, { capture: true });
        window.removeEventListener('touchstart', onTS);
        window.removeEventListener('touchend',   onTE);
        const l = getLenis(); if (l) l.start();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={styles.section}
      aria-label="Hero — 지구 끝의 온실"
    >
      {/* ── 가장 아래: 원래 그라디언트 배경 ── */}
      <div className={styles.bgBase} />

      {/* ── 레이어 1: bg.jpg (줌) ── */}
      <div className={styles.bgLayer} ref={bgLayerRef}>
        <img
          src="/images/hero/bg.jpg"
          alt=""
          className={styles.bgImage}
          aria-hidden="true"
          draggable="false"
        />
        {/* 컬러 글로우 오버레이 */}
        <div className={styles.bgGlow} />
        {/* 하단 페이드 */}
        <div className={styles.bgFade} />
      </div>

      {/* ── 레이어 2: 텍스트 ── */}
      <div className={styles.content} ref={titleRef}>
        <h1 className={styles.title} aria-label={TITLE}>
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              ref={(el) => (charsRef.current[i] = el)}
              className={`${styles.char} ${char === ' ' ? styles.space : ''}`}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          The Greenhouse at the End of the Earth
        </p>
        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>scroll</span>
        </div>
      </div>

      {/* ── 레이어 3: 전경 식물 (fg.png) ── */}
      <div className={styles.fgLayer} ref={fgLayerRef}>
        <img
          src="/images/hero/fg.png"
          alt=""
          className={styles.fgImage}
          aria-hidden="true"
          draggable="false"
        />
      </div>

      {/* ── 레이어 4: 시네마틱 인용구 오버레이 ── */}
      <div
        className={styles.quoteOverlay}
        ref={quoteOverRef}
        aria-hidden="true"
      >
        {QUOTES.map((q, i) => (
          <p
            key={i}
            ref={(el) => (quoteRefs.current[i] = el)}
            className={styles.quoteText}
          >
            {q}
          </p>
        ))}
      </div>

      {/* 섹션 인디케이터 */}
      <div ref={indicatorRef} className={styles.indicator}>
        <span>01</span>
        <span className={styles.indicatorDivider}>/</span>
        <span>06</span>
      </div>
    </section>
  );
}
