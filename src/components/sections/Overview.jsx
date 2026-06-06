'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Overview.module.css';

const Book3D = dynamic(() => import('./Book3D'), {
  ssr: false,
  loading: () => (
    <div className={styles.bookPlaceholder}>
      <div className={styles.bookCover}>
        <span className={styles.bookCoverTitle}>지구 끝의 온실</span>
        <span className={styles.bookCoverAuthor}>김초엽</span>
        <div className={styles.bookCoverSheen} />
      </div>
      <div className={styles.bookSpine} />
      <div className={styles.bookLabel}>LOADING 3D MODEL...</div>
    </div>
  ),
});

gsap.registerPlugin(ScrollTrigger);

export default function Overview() {
  const sectionRef = useRef(null);
  const bookRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 초기 상태
      gsap.set(linesRef.current, { opacity: 0, y: 24 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(bookRef.current, { opacity: 0, x: -30 });

      // 스크롤 진입 트리거
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          // 1. 책 fade in
          tl.to(bookRef.current, {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: 'power3.out',
          });

          // 2. 수평선 그어지기
          tl.to(lineRef.current, {
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.inOut',
          }, '-=0.3');

          // 3. 텍스트 stagger fade up
          tl.to(linesRef.current, {
            opacity: 1, y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
          }, '-=0.2');
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const textLines = [
    { type: 'label', content: 'OVERVIEW' },
    { type: 'body', content: '인류를 대멸종으로 몰고 간 먼지 \'더스트\' 폭풍 이후,\n재건된 세계에서 발견된 기묘한 식물과 과거(더스트 시대)의 진실을 추적하는 이야기.' },
    { type: 'tags', content: ['#포스트아포칼립스', '#식물', '#연대'] },
    { type: 'meta', content: '김초엽 · 아작 · 2021' },
  ];

  return (
    <section
      id="overview"
      ref={sectionRef}
      className={styles.section}
      aria-label="Overview — 작품 소개"
    >
      <div className={styles.container}>
        {/* 좌: 책 3D 영역 */}
        <div className={styles.bookSide} ref={bookRef} data-cursor-hover>
          <div className={styles.bookInner}>
            <Book3D />
          </div>
        </div>

        {/* 우: 텍스트 */}
        <div className={styles.textSide} ref={textRef}>
          {/* 라벨 라인 */}
          <div className={styles.labelRow}
            ref={(el) => (linesRef.current[0] = el)}>
            <span className={styles.sectionLabel}>Overview</span>
            <div className={styles.sectionLine} ref={lineRef} />
          </div>

          {/* 본문 */}
          <p
            className={styles.body}
            ref={(el) => (linesRef.current[1] = el)}
          >
            인류를 대멸종으로 몰고 간 먼지 &#39;더스트&#39; 폭풍 이후,<br />
            재건된 세계에서 발견된 기묘한 식물과<br />
            과거(더스트 시대)의 진실을 추적하는 이야기.
          </p>

          {/* 해시태그 */}
          <div
            className={styles.tags}
            ref={(el) => (linesRef.current[2] = el)}
          >
            {['#포스트아포칼립스', '#식물', '#연대'].map((tag, i) => (
              <span key={tag} className={styles.tag}>
                {i > 0 && <span className={styles.tagDivider} />}
                {tag}
              </span>
            ))}
          </div>

          {/* 메타 */}
          <div
            className={styles.meta}
            ref={(el) => (linesRef.current[3] = el)}
          >
            <span>김초엽</span>
            <span className={styles.metaDot} />
            <span>아작</span>
            <span className={styles.metaDot} />
            <span>2021</span>
          </div>
        </div>
      </div>
    </section>
  );
}
