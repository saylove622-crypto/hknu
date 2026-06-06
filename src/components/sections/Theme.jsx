'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { themes } from '@/data/content';
import styles from './Theme.module.css';

import { getAssetPath } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

function StarField({ count = 60 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      speed:   Math.random() * 0.3 + 0.05,
      offset:  Math.random() * Math.PI * 2,
    }));

    let frame, t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;
      stars.forEach((s) => {
        const a = Math.sin(t * s.speed + s.offset) * 0.3 + s.opacity;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,195,247,${Math.max(0, a)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, [count]);

  return <canvas ref={canvasRef} className={styles.starCanvas} />;
}

// 챕터별 레이아웃: 번호가 왼쪽이면 'left', 오른쪽이면 'right'
const LAYOUTS = ['left', 'right', 'left'];

export default function Theme() {
  const sectionRef   = useRef(null);
  const bgImgRef     = useRef(null);     // 배경 사진 패럴렉스
  const chaptersRef  = useRef([]);
  const numRefs      = useRef([]);
  const contentRefs  = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 배경 이미지 패럴렉스 ──────────────────
      if (bgImgRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start:  'top bottom',
          end:    'bottom top',
          scrub:  2.5,
          onUpdate: (self) => {
            gsap.set(bgImgRef.current, { y: self.progress * -100 });
          },
        });
      }

      // ── 각 챕터 애니메이션 ───────────────────
      chaptersRef.current.forEach((chapter, i) => {
        if (!chapter) return;
        const num     = numRefs.current[i];
        const content = contentRefs.current[i];
        if (!num || !content) return;

        const enWrap    = content.querySelector(`.${styles.enWrap}`);
        const titleWrap = content.querySelector(`.${styles.titleWrap}`);
        const quoteWrap = content.querySelector(`.${styles.quoteWrap}`);

        const en    = content.querySelector(`.${styles.chapterTitleEn}`);
        const title = content.querySelector(`.${styles.chapterTitle}`);
        const quote = content.querySelector(`.${styles.chapterQuote}`);
        const desc  = content.querySelector(`.${styles.chapterDesc}`);

        // 초기 숨김 및 초기화
        const slideX = LAYOUTS[i] === 'right' ? 50 : -50;
        gsap.set(num,                   { opacity: 0, x: slideX });
        gsap.set([en, title, quote, desc], { opacity: 0, y: 36 });
        gsap.set([enWrap, titleWrap, quoteWrap], { y: 0 });

        // 스크롤 진입 fade-in
        ScrollTrigger.create({
          trigger: chapter,
          start:   'top 68%',
          once:    true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(num,   { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' });
            tl.to(en,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');
            tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
            tl.to(quote, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');
            tl.to(desc,  { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
          },
        });

        // 패럴렉스 — 타임라인 기반 scrub으로 극강의 부드러움 제공 (onUpdate 연산 오버헤드 및 transform 경합 제거)
        gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start:   'top bottom',
            end:     'bottom top',
            scrub:   1.4,
          }
        })
        .to(num,       { y: -100, ease: 'none' }, 0)
        .to(enWrap,    { y: -28,  ease: 'none' }, 0)
        .to(titleWrap, { y: -42,  ease: 'none' }, 0)
        .to(quoteWrap, { y: -16,  ease: 'none' }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="theme"
      ref={sectionRef}
      className={styles.section}
      aria-label="Theme — 이야기"
    >
      {/* 배경 사진 (저채도 + 저투명도) */}
      <div className={styles.bgImageWrap} ref={bgImgRef}>
        <img
          src={getAssetPath('/images/theme/bg-forest.jpg')}
          alt=""
          className={styles.bgImageEl}
          aria-hidden="true"
          draggable="false"
        />
      </div>

      {/* 별 캔버스 */}
      <StarField count={80} />

      <div className={styles.container}>
        {/* 섹션 헤더 */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Story · Theme</span>
          <div className={styles.sectionLine} />
          <span className={styles.sectionNum}>04 / 06</span>
        </div>

        {/* 챕터 목록 */}
        <div className={styles.chapters}>
          {themes.map((theme, i) => {
            const side = LAYOUTS[i] || 'left';
            return (
              <div
                key={theme.number}
                ref={(el) => (chaptersRef.current[i] = el)}
                className={`${styles.chapter} ${side === 'right' ? styles.chapterFlip : ''}`}
              >
                {/* 번호 칸 */}
                <div className={styles.numCol}>
                  <div
                    ref={(el) => (numRefs.current[i] = el)}
                    className={styles.chapterNumber}
                  >
                    {theme.number}
                  </div>
                </div>

                {/* 콘텐츠 칸 */}
                <div
                  ref={(el) => (contentRefs.current[i] = el)}
                  className={styles.contentCol}
                >
                  <div className={styles.enWrap}>
                    <p className={styles.chapterTitleEn}>{theme.titleEn}</p>
                  </div>
                  <div className={styles.titleWrap}>
                    <h2 className={styles.chapterTitle}>{theme.title}</h2>
                  </div>
                  <div className={styles.chapterDivider} />
                  <div className={styles.quoteWrap}>
                    <blockquote className={styles.chapterQuote}>{theme.quote}</blockquote>
                  </div>
                  <p className={styles.chapterDesc}>{theme.description}</p>
                </div>

                {i < themes.length - 1 && <div className={styles.chapterSeparator} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
