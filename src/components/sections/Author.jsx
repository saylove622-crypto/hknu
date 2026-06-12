'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { authorData } from '@/data/content';
import styles from './Author.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Author() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const tickerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([leftRef.current, rightRef.current], { opacity: 0, y: 32 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          gsap.to(leftRef.current, {
            opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          });
          gsap.to(rightRef.current, {
            opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.15,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 티커: books 배열을 2번 복제하여 무한 루프
  const tickerBooks = [...authorData.books, ...authorData.books];

  return (
    <section
      id="author"
      ref={sectionRef}
      className={styles.section}
      aria-label="Author — 작가 소개"
    >
      {/* 배경 그라디언트 */}
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.container}>

        {/* ── 좌: 프로필 ── */}
        <div className={styles.leftPanel} ref={leftRef}>
          {/* 섹션 라벨 */}
          <div className={styles.sectionLabelRow}>
            <span className={styles.sectionLabel}>AUTHOR</span>
            <div className={styles.labelLine} />
          </div>

          {/* 이름 */}
          <div className={styles.nameBlock}>
            <h2 className={styles.nameKr}>{authorData.nameKr}</h2>
            <p className={styles.nameEn}>{authorData.nameEn}</p>
          </div>

          {/* 프로필 이미지 placeholder */}
          <div className={styles.profileFrame} aria-label="프로필 이미지 영역 (추후 삽입)">
            <div className={styles.profileInner}>
              <span className={styles.profileLabel}>PROFILE IMAGE</span>
              <span className={styles.profileSub}>이미지 추후 삽입</span>
            </div>
          </div>

          {/* 소속 */}
          <div className={styles.publisherRow}>
            <span className={styles.publisherLabel}>Publisher</span>
            <span className={styles.publisherName}>{authorData.publisher}</span>
          </div>
        </div>

        {/* ── 우: 어워드 + 티커 ── */}
        <div className={styles.rightPanel} ref={rightRef}>
          {/* Award */}
          <div className={styles.awardBlock}>
            <div className={styles.awardLabelRow}>
              <span className={styles.awardLabel}>AWARD</span>
              <div className={styles.awardLine} />
            </div>
            <dl className={styles.awardList}>
              {authorData.awards.map((award, i) => (
                <div key={i} className={styles.awardItem}>
                  <dt className={styles.awardYear}>{award.year}</dt>
                  <dd className={styles.awardTitle}>{award.title}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 출판 서적 티커 */}
          <div className={styles.booksBlock}>
            <div className={styles.booksLabelRow}>
              <span className={styles.booksLabel}>BOOKS</span>
              <div className={styles.booksLine} />
            </div>
            <div className={styles.tickerWrapper} ref={tickerRef} aria-label="출판 서적 목록">
              <div className={styles.tickerTrack}>
                {tickerBooks.map((book, i) => (
                  <div key={i} className={styles.bookCard} aria-label={`${book.year} ${book.title}`}>
                    {/* 표지 이미지 placeholder */}
                    <div className={styles.bookCoverFrame}>
                      <span className={styles.bookCoverLabel}>COVER</span>
                    </div>
                    <div className={styles.bookMeta}>
                      <span className={styles.bookYear}>{book.year}</span>
                      <span className={styles.bookTitle}>{book.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
