'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from '@/lib/lenis';
import Cursor from '@/components/Cursor';
import Navigator from '@/components/Navigator';
import Hero from '@/components/sections/Hero';
import Overview from '@/components/sections/Overview';
import Character from '@/components/sections/Character';
import Theme from '@/components/sections/Theme';
import Media from '@/components/sections/Media';
import End from '@/components/sections/End';

import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

// 섹션 순서
const SECTIONS = ['hero', 'overview', 'character', 'theme', 'media', 'end'];

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isEntered, setIsEntered] = useState(false);
  const mainRef = useRef(null);

  // Lenis 스무스 스크롤 초기화
  useLenis();

  // 페이지 진입 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => setIsEntered(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // 현재 섹션 감지 (IntersectionObserver)
  useEffect(() => {
    const observers = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* 노이즈 텍스처 오버레이 */}
      <div className={styles.noise} aria-hidden="true" />

      {/* 커스텀 커서 */}
      <Cursor />

      {/* 상단 네비게이터 */}
      <Navigator activeSection={activeSection} />

      {/* 모바일 안내 */}
      <div className={styles.mobileWarning} role="alert" aria-live="polite">
        <div className={styles.mobileWarningInner}>
          <p className={styles.mobileWarningTitle}>지구 끝의 온실</p>
          <p className={styles.mobileWarningMsg}>
            이 사이트는 데스크탑 환경에서 관람하시길 권장합니다.
          </p>
          <p className={styles.mobileWarningMeta}>
            Desktop recommended · 1280px+
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main
        ref={mainRef}
        className={`${styles.main} ${isEntered ? styles.entered : ''}`}
        id="main-content"
      >
        <Hero />
        <Overview />
        <Character />
        <Theme />
        <Media />
        <End />
      </main>
    </>
  );
}
