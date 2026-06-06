'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { characters } from '@/data/content';
import { getAssetPath } from '@/lib/utils';
import styles from './Character.module.css';
import CharacterDialog from '@/components/CharacterDialog';

// ── 특정 캐릭터 첫 클릭 시 발생하는 돌발이벤트 대사 ────────────────
const CHARACTER_EVENTS = {
  rachel: {
    lines: [
      { text: '날 도와줘.\n혼란스러워. 머리가 깨질 것 같아......' },
    ],
  },
  'amara-naomi': {
    lines: [
      { text: '난 못 가요. 안 갈 거예요!' },
      { text: '갑자기...... 갑자기 이러는 게 어딨어요.' },
      {
        text: '지수 씨도 여길 떠나기 싫다고 했잖아요.\n인사할 시간도 안 줬잖아요.',
        choice: '이게 마지막이 아니야.',
      },
      { text: '우리는 다시 만날 수 있나요?\n또다른 프림 빌리지를 만들면, 그러면 그때는요.' },
      {
        text: '......',
        choice: '......',
      },
      { text: '할게요' },
      { text: '약속할게요.\n가서 식물들을 심을게요' },
    ],
  },
};

export default function Character() {
  const [activeId, setActiveId]         = useState(null);
  const [displayId, setDisplayId]       = useState(null);
  const [dialog, setDialog]             = useState(null);
  const [triggeredSet, setTriggeredSet] = useState(new Set()); // 이미 이벤트 발생한 id 목록
  const detailRef                       = useRef(null);
  const sectionRef                      = useRef(null);

  const activeChar = characters.find((c) => c.id === displayId);

  const handleSelect = async (char) => {
    // ── 돌발이벤트: 처음 클릭하는 경우에만 ──
    if (CHARACTER_EVENTS[char.id] && !triggeredSet.has(char.id)) {
      setTriggeredSet(prev => new Set([...prev, char.id]));
      setDialog({
        charId: char.id,
        lines:  CHARACTER_EVENTS[char.id].lines,
        name:   char.name,
        color:  char.color,
      });
      return;
    }

    if (char.id === activeId) return;

    if (activeId && detailRef.current) {
      await gsap.to(detailRef.current, {
        opacity: 0, y: -12,
        duration: 0.25,
        ease: 'power2.in',
      });
    }

    setActiveId(char.id);
    setDisplayId(char.id);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (detailRef.current) {
          gsap.fromTo(
            detailRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
          );
        }
      });
    });
  };

  const handleDialogClose = () => {
    const charId = dialog?.charId;
    setDialog(null);

    // 팝업 닫힌 후 캐릭터 detail 전환
    if (charId) {
      const char = characters.find((c) => c.id === charId);
      if (char) {
        setActiveId(char.id);
        setDisplayId(char.id);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (detailRef.current) {
              gsap.fromTo(
                detailRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
              );
            }
          });
        });
      }
    }
  };

  return (
    <>
      <section
        id="character"
        ref={sectionRef}
        className={styles.section}
        aria-label="Character — 등장인물"
      >
        <div className={styles.container}>
          {/* 섹션 라벨 */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Character</span>
            <div className={styles.sectionLine} />
            <span className={styles.sectionNum}>03 / 06</span>
          </div>

          {/* 상단 디테일 영역 */}
          <div className={styles.detailArea}>
            {!activeChar ? (
              /* 초기 가이드 */
              <div className={styles.guide}>
                <div className={styles.guideLine} />
                <p className={styles.guideText}>Select a character</p>
                <div className={styles.guideSubtext}>캐릭터 프로필을 선택하세요</div>
                <div className={styles.guideLine} />
              </div>
            ) : (
              <div ref={detailRef} className={styles.detail}>
                {/* 좌: 캐릭터 이미지 */}
                <div className={styles.detailImage}>
                  <div
                    className={styles.imagePlaceholder}
                    style={{ '--char-color': activeChar.color }}
                    data-label={`${activeChar.name}`}
                  >
                    <img
                      src={getAssetPath(`/images/characters/${activeChar.id === 'amara-naomi' ? 'sis' : activeChar.id}.png`)}
                      alt={activeChar.name}
                      className={styles.charImage}
                    />
                    <div className={styles.imageGlow} />
                  </div>
                </div>

                {/* 우: 캐릭터 텍스트 */}
                <div className={styles.detailText}>
                  <p className={styles.charRole}>{activeChar.role}</p>
                  <h2 className={styles.charName}>{activeChar.name}</h2>
                  <p className={styles.charNameEn}>{activeChar.nameEn}</p>
                  <div className={styles.charDivider} style={{ '--char-color': activeChar.color }} />
                  <p className={styles.charDesc}>{activeChar.description}</p>
                </div>
              </div>
            )}
          </div>

          {/* 하단 프로필 선택 */}
          <div className={styles.profileRow}>
            {characters.map((char) => (
              <button
                key={char.id}
                className={`${styles.profileBtn} ${activeId === char.id ? styles.profileActive : ''}`}
                onClick={() => handleSelect(char)}
                data-cursor-hover
                aria-label={`캐릭터 선택: ${char.name}`}
                style={{ '--char-color': char.color }}
              >
                <div className={styles.profileCircle}>
                  <img
                    src={getAssetPath(`/images/characters/${char.id === 'amara-naomi' ? 'sis' : char.id}.png`)}
                    alt={char.name}
                    className={styles.profileBtnImage}
                  />
                  {activeId === char.id && (
                    <div className={styles.profileGlowRing} />
                  )}
                  {/* 첫 클릭 유도 — 이벤트가 있고 아직 미트리거 캐릭터에 펄스 표시 */}
                  {CHARACTER_EVENTS[char.id] && !triggeredSet.has(char.id) && activeId !== char.id && (
                    <div className={styles.eventPulse} style={{ '--char-color': char.color }} />
                  )}
                </div>
                <span className={styles.profileName}>{char.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 돌발이벤트 팝업 ── */}
      {dialog && (
        <CharacterDialog
          lines={dialog.lines}
          charName={dialog.name}
          charColor={dialog.color}
          onClose={handleDialogClose}
        />
      )}
    </>
  );
}
