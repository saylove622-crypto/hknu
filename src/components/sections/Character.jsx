'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { characterGraph } from '@/data/content';
import { getAssetPath } from '@/lib/utils';
import styles from './Character.module.css';
import CharacterDialog from '@/components/CharacterDialog';

/* CharacterGraph는 SSR 없이 로드 (three.js / rough.js client-only) */
const CharacterGraph = dynamic(() => import('@/components/CharacterGraph'), {
  ssr: false,
  loading: () => <div className={styles.graphLoading}><span>LOADING GRAPH...</span></div>,
});

/* ── 첫 클릭 시 발생하는 돌발이벤트 ── */
const DIALOG_EVENTS = {
  rachel: {
    lines: [
      { text: '날 도와줘.\n혼란스러워. 머리가 깨질 것 같아......' },
    ],
  },
  naomi: {
    lines: [
      { text: '난 못 가요. 안 갈 거예요!' },
      { text: '갑자기...... 갑자기 이러는 게 어딨어요.' },
      {
        text: '지수 씨도 여길 떠나기 싫다고 했잖아요.\n인사할 시간도 안 줬잖아요.',
        choice: '이게 마지막이 아니야.',
      },
      { text: '우리는 다시 만날 수 있나요?\n또다른 프림 빌리지를 만들면, 그러면 그때는요.' },
      { text: '......', choice: '......' },
      { text: '할게요' },
      { text: '약속할게요.\n가서 식물들을 심을게요' },
    ],
  },
};

export default function Character() {
  const [era,          setEra]          = useState('dust');
  const [selectedNode, setSelectedNode] = useState(null);
  const [dialog,       setDialog]       = useState(null);
  const [triggered,    setTriggered]    = useState(new Set());
  const detailRef  = useRef(null);
  const panelRef   = useRef(null);

  /* 에라 전환 시 선택 초기화 */
  const handleEraChange = (next) => {
    if (next === era) return;
    if (selectedNode && !selectedNode.era.includes(next)) {
      collapseDetail(() => setSelectedNode(null));
    }
    setEra(next);
  };

  /* 노드 클릭 처리 */
  const handleNodeClick = (node) => {
    // 첫 클릭 다이얼로그
    if (DIALOG_EVENTS[node.id] && !triggered.has(node.id)) {
      setTriggered(prev => new Set([...prev, node.id]));
      setDialog({ charId: node.id, lines: DIALOG_EVENTS[node.id].lines, name: node.name, color: node.color });
      return;
    }
    expandDetail(node);
  };

  /* 다이얼로그 닫힌 후 → 디테일 패널 열기 */
  const handleDialogClose = () => {
    const { charId } = dialog || {};
    setDialog(null);
    if (charId) {
      const node = characterGraph.nodes.find(n => n.id === charId);
      if (node) expandDetail(node);
    }
  };

  /* 디테일 패널 열기 (GSAP slide up) */
  const expandDetail = (node) => {
    if (selectedNode?.id === node.id) return;

    if (selectedNode) {
      collapseDetail(() => {
        setSelectedNode(node);
      });
    } else {
      setSelectedNode(node);
    }
  };

  /* 디테일 패널 닫기 */
  const collapseDetail = (cb) => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        y: 20, opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => { if (cb) cb(); },
      });
    } else {
      if (cb) cb();
    }
  };

  const handleCloseDetail = () => {
    collapseDetail(() => setSelectedNode(null));
  };

  /* selectedNode 변경 시 패널 슬라이드인 */
  useEffect(() => {
    if (selectedNode && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { y: 30, opacity: 0 },
        { y: 0,  opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [selectedNode]);

  return (
    <>
      <section
        id="character"
        className={styles.section}
        aria-label="Character — 인물관계도"
      >
        {/* ── 배경 그라디언트 ── */}
        <div className={styles.bgOverlay} aria-hidden="true" />

        {/* ── 좌측: 반원 타임라인 스위치 ── */}
        <aside className={styles.eraToggle} aria-label="시대 선택">
          <span className={styles.eraToggleLabel}>TIME</span>

          <div className={styles.eraSwitchBox}>
            {/* 시대 라벨 (더스트) */}
            <span
              className={`${styles.eraLbl} ${styles.eraLblDust} ${era === 'dust' ? styles.eraLblOn : ''}`}
              onClick={() => handleEraChange('dust')}
              data-cursor-hover
            >
              더스트<br/>시대
            </span>

            <div className={styles.eraSwitchTrack}>
              {/* 반원 SVG 트랙 */}
              <svg viewBox="0 0 60 120" className={styles.eraSwitchSvg}>
                <path d="M 58 10 A 50 50 0 0 0 58 110" fill="none" stroke="rgba(245,240,232,0.15)" strokeWidth="1.5" strokeDasharray="3 4"/>
              </svg>
              
              {/* 회전하는 손잡이 (Knob) 래퍼 - CSS transform으로 회전 */}
              <div
                className={`${styles.eraKnobWrap} ${era === 'post' ? styles.eraKnobWrapPost : ''}`}
                onClick={() => handleEraChange(era === 'dust' ? 'post' : 'dust')}
                data-cursor-hover
              >
                <div className={styles.eraKnob}>
                  <div className={styles.eraKnobInner} />
                </div>
              </div>
            </div>

            {/* 시대 라벨 (현재) */}
            <span
              className={`${styles.eraLbl} ${styles.eraLblPost} ${era === 'post' ? styles.eraLblOn : ''}`}
              onClick={() => handleEraChange('post')}
              data-cursor-hover
            >
              현재<br/>시대
            </span>
          </div>
        </aside>

        {/* ── 섹션 상단 라벨 ── */}
        <div className={styles.sectionLabel}>
          <span className={styles.sectionLabelTxt}>CHARACTER</span>
          <div className={styles.sectionLabelLine} />
          <span className={styles.sectionEraIndicator}>
            {era === 'dust' ? '더스트 시대' : '현재 시대'}
          </span>
        </div>

        {/* ── 그래프 영역 ── */}
        <div className={styles.graphArea}>
          <CharacterGraph
            era={era}
            selectedId={selectedNode?.id ?? null}
            onNodeClick={handleNodeClick}
          />
        </div>

        {/* ── 디테일 패널 (노드 선택 시) ── */}
        {selectedNode && (
          <div className={styles.detailPanel} ref={panelRef}>
            {/* 닫기 */}
            <button
              className={styles.detailClose}
              onClick={handleCloseDetail}
              aria-label="닫기"
              data-cursor-hover
            >
              ✕
            </button>

            <div className={styles.detailInner}>
              {/* 좌: 프로필 이미지 */}
              <div className={styles.detailLeft}>
                <div
                  className={styles.profileFrame}
                  style={{ borderColor: `${selectedNode.color}55` }}
                >
                  <img
                    src={getAssetPath(`/images/characters/${selectedNode.id}.png`)}
                    alt={selectedNode.name}
                    className={styles.profileImg}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div
                    className={styles.profilePlaceholder}
                    style={{ '--nc': selectedNode.color }}
                  >
                    <span className={styles.profilePlaceholderTxt}>PROFILE</span>
                  </div>
                </div>
              </div>

              {/* 우: 텍스트 정보 */}
              <div className={styles.detailRight}>
                {/* 시대 태그 */}
                <div className={styles.eraTagRow}>
                  {selectedNode.era.includes('dust') && (
                    <span className={styles.eraTag} style={{ borderColor: 'rgba(79,195,247,0.3)', color: 'rgba(79,195,247,0.7)' }}>
                      더스트시대
                    </span>
                  )}
                  {selectedNode.era.includes('post') && (
                    <span className={styles.eraTag} style={{ borderColor: 'rgba(164,222,234,0.3)', color: 'rgba(164,222,234,0.7)' }}>
                      현재시대
                    </span>
                  )}
                </div>

                {/* 이름 */}
                <h2 className={styles.charName}>{selectedNode.name}</h2>
                <p className={styles.charNameEn}>{selectedNode.nameEn}</p>
                <p className={styles.charShort} style={{ color: selectedNode.color }}>
                  {selectedNode.shortDesc}
                </p>

                {/* 구분선 */}
                <div
                  className={styles.charDivider}
                  style={{ background: `linear-gradient(to right, ${selectedNode.color}55, transparent)` }}
                />

                {/* 설명 */}
                <p className={styles.charDesc}>{selectedNode.description}</p>

                {/* 관계 */}
                {selectedNode.relationships?.length > 0 && (
                  <div className={styles.relBlock}>
                    <span className={styles.relBlockLabel}>관계</span>
                    <ul className={styles.relList}>
                      {selectedNode.relationships.map((rel, i) => {
                        const target = characterGraph.nodes.find(n => n.id === rel.target);
                        return (
                          <li key={i} className={styles.relItem}>
                            <span className={styles.relTarget} style={{ color: target?.color }}>
                              {target?.name.split('/')[0].trim()}
                            </span>
                            <span className={styles.relArrow}>→</span>
                            <span className={styles.relLabel}>{rel.label}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 돌발이벤트 다이얼로그 Portal */}
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
