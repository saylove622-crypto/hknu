'use client';

import styles from './Setting.module.css';

/**
 * Setting 섹션 — 세계관 사전 (추후 구현)
 * zdog.js로 더스트 폴 / 내성종 / 돔 / 모스바나 개념 사전 예정
 */
export default function Setting() {
  const entries = [
    { term: 'Dust Fall', kr: '더스트 폴', desc: '인류 대멸종을 야기한 먼지 폭풍. 대기 중 독성 입자가 생태계를 붕괴시켰다.' },
    { term: 'Naeseong-jong', kr: '내성종', desc: '더스트 환경에 적응하여 생존한 변이 생물 종.' },
    { term: 'Dom', kr: '돔', desc: '더스트로부터 인류를 보호하기 위해 건설된 거대 밀폐 주거 구역.' },
    { term: 'Mosvana', kr: '모스바나', desc: '더스트에 적응한 기묘한 덩굴 식물. 그 확산의 비밀이 이야기의 핵심이다.' },
  ];

  return (
    <section
      id="setting"
      className={styles.section}
      aria-label="Setting — 세계관 사전"
    >
      <div className={styles.bgOverlay} aria-hidden="true" />

      <div className={styles.container}>
        {/* 라벨 */}
        <div className={styles.labelRow}>
          <span className={styles.sectionLabel}>SETTING</span>
          <div className={styles.labelLine} />
        </div>

        {/* 타이틀 */}
        <h2 className={styles.title}>세계관 사전</h2>
        <p className={styles.subtitle}>World Dictionary</p>

        {/* 컨셉 그리드 — placeholder */}
        <div className={styles.grid}>
          {entries.map((entry) => (
            <div key={entry.term} className={styles.card}>
              <div className={styles.cardCanvas} aria-label={`${entry.kr} zdog.js 렌더 영역`}>
                <div className={styles.cardCanvasInner}>
                  <span className={styles.cardCanvasLabel}>zdog.js</span>
                  <span className={styles.cardCanvasNote}>3D 오브젝트 예정</span>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardTermEn}>{entry.term}</span>
                <span className={styles.cardTermKr}>{entry.kr}</span>
                <p className={styles.cardDesc}>{entry.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon 배지 */}
        <div className={styles.comingSoon}>
          <span className={styles.comingSoonText}>COMING SOON</span>
          <p className={styles.comingSoonNote}>
            zdog.js를 활용한 인터랙티브 세계관 사전이 준비 중입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
