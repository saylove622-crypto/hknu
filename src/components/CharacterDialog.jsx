'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import styles from './CharacterDialog.module.css';

/*
  CharacterDialog
  ───────────────
  props:
    lines     — 대사 배열. 각 항목: { text: string, choice?: string }
    charName  — 화자 이름
    charColor — 캐릭터 테마 색
    onClose   — 모든 대사 끝 or 강제 닫기 콜백
*/
export default function CharacterDialog({ lines, charName, charColor, onClose }) {
  const [idx, setIdx] = useState(0);
  const [choiceClicked, setChoiceClicked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayRef  = useRef(null);
  const panelRef    = useRef(null);
  const textRef     = useRef(null);
  const choiceRef   = useRef(null);

  const current = lines[idx];
  const hasChoice = !!current?.choice;

  useEffect(() => {
    setMounted(true);
  }, []);

  // 진입 애니메이션
  useEffect(() => {
    if (!mounted || !overlayRef.current || !panelRef.current) return;
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: 'power2.out' }
    );
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' }
    );
  }, [mounted]);

  // 대사 텍스트 교체 애니메이션
  const animateText = (cb) => {
    if (!textRef.current) { cb?.(); return; }
    gsap.to(textRef.current, {
      opacity: 0, y: -8, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        cb?.();
        requestAnimationFrame(() => {
          gsap.fromTo(textRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          );
        });
      }
    });
  };

  // 패널 닫기 애니메이션
  const closePanel = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: 'power2.in' });
    gsap.to(panelRef.current, {
      opacity: 0, y: 16, scale: 0.97, duration: 0.3, ease: 'power2.in',
      onComplete: onClose,
    });
  };

  // 다음 대사로
  const advance = () => {
    if (choiceClicked === false && hasChoice) return; // 선택지 클릭 전엔 진행 불가
    const next = idx + 1;
    if (next >= lines.length) {
      closePanel();
    } else {
      setChoiceClicked(false);
      animateText(() => setIdx(next));
    }
  };

  // 선택지 클릭
  const handleChoice = () => {
    setChoiceClicked(true);
    // 선택지 버튼 fade out 후 advance
    if (choiceRef.current) {
      gsap.to(choiceRef.current, {
        opacity: 0, y: 6, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
          const next = idx + 1;
          if (next >= lines.length) {
            closePanel();
          } else {
            animateText(() => { setIdx(next); setChoiceClicked(false); });
          }
        }
      });
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={(e) => {
        // 오버레이 클릭 시 (패널 외부) → 강제 닫기
        if (e.target === overlayRef.current) closePanel();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${charName} 대사`}
    >
      <div ref={panelRef} className={styles.panel}>

        {/* ── 그리드 데코 라인 ── */}
        <div className={styles.gridTopLine} />
        <div className={styles.gridLeftLine} />

        {/* ── 헤더 ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span
              className={styles.charDot}
              style={{ background: charColor, boxShadow: `0 0 10px ${charColor}88` }}
            />
            <span className={styles.charName} style={{ color: charColor }}>
              {charName}
            </span>
          </div>
          <div className={styles.headerMeta}>
            <span className={styles.lineCount}>
              {String(idx + 1).padStart(2, '0')} / {String(lines.length).padStart(2, '0')}
            </span>
            <button
              className={styles.closeBtn}
              onClick={closePanel}
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        </div>

        <div className={styles.dividerLine} style={{ background: charColor + '44' }} />

        {/* ── 대사 ── */}
        <div className={styles.body} ref={textRef}>
          <p className={styles.dialogText}>{current?.text}</p>
        </div>

        {/* ── 선택지 버튼 ── */}
        {hasChoice && !choiceClicked && (
          <div ref={choiceRef} className={styles.choiceArea}>
            <button
              className={styles.choiceBtn}
              style={{ '--char-color': charColor }}
              onClick={handleChoice}
            >
              <span className={styles.choiceArrow}>▸</span>
              {current.choice}
            </button>
          </div>
        )}

        {/* ── 하단 진행 버튼 ── */}
        {(!hasChoice || choiceClicked) && (
          <div className={styles.footer}>
            <button className={styles.nextBtn} onClick={advance} style={{ '--char-color': charColor }}>
              {idx + 1 >= lines.length ? '닫기' : '계속'}
              <span className={styles.nextArrow}>→</span>
            </button>
          </div>
        )}

        {/* ── 우하단 코너 데코 ── */}
        <div className={styles.cornerDeco} style={{ borderColor: charColor + '55' }} />
      </div>
    </div>,
    document.body
  );
}

