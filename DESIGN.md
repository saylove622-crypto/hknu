# 지구 끝의 온실 — 디자인 시스템

비주얼 디자인 상세 명세. 개발 기획은 [README.md](./README.md) 참고.

---

## 1. 컬러 시스템

```css
--color-night       : #0A0E2A   /* 최상단 우주 딥 네이비 */
--color-midnight    : #1B1547   /* 중간 보랏빛 어둠 */
--color-magenta     : #6B1E5C   /* 전환 마젠타 */
--color-hotpink     : #E91E63   /* 하단 핫핑크 */
--color-coral       : #FF2D6F   /* 최하단 발광 코랄 */

--color-glow-blue   : #4FC3F7   /* 푸른 glow (커서, 네비, 식물 빛) */
--color-glow-cyan   : #80DEEA   /* 보조 글로우 */

--color-text-primary: #F5F0E8   /* 따뜻한 오프화이트 */
--color-text-mute   : #B8B0C8   /* 보조 텍스트 */
--color-line        : rgba(245, 240, 232, 0.18) /* 얇은 라인 */
```

배경 전체에 종이 질감 노이즈 텍스처(`paper-noise.webp`)를 `mix-blend-mode: overlay`, opacity 0.15로 깔아 거친 질감 재현.

---

## 2. 타이포그래피

```css
--font-display-kr   : 'Pretendard', 'Noto Serif KR'
--font-body-kr      : 'Pretendard', sans-serif
--font-display-en   : 'Fraunces', 'Cormorant Garamond'
--font-mono         : 'Eulyoo1945' (문해모노체)

/* 타입 스케일 (1280 기준) */
hero-title    : 120px / weight 200 / letter-spacing -0.02em
section-title :  64px / weight 300
chapter-title :  40px / weight 400
body-large    :  18px / weight 400 / line-height 1.7
body          :  15px / weight 400 / line-height 1.8
caption/meta  :  12px / mono / tracking -0.015em / uppercase
```

**문해모노체(Eulyoo1945) 자간**: 전역 `letter-spacing: -0.015em` 적용.

---

## 3. 그리드 & 레이아웃

12 column grid, gutter 24px, 최대 콘텐츠 폭 1200px, 좌우 safe margin 40px.  
코너 라운드 0px. 모든 박스는 1px hairline border(`var(--color-line)`) 구획.

**반응형 기준**:
- `>= 861px`: 2컬럼 레이아웃 유지 (1200×700 뷰포트 포함)
- `<= 860px`: 단일 컬럼 전환

---

## 4. 글래스모피즘 규칙 (제한적 적용)

```css
background: rgba(10, 14, 42, 0.35);
backdrop-filter: blur(20px) saturate(140%);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 0;
```

---

## 5. 섹션별 비주얼 설계

**Hero**: 풀스크린. 제목 "지구 끝의 온실" weight 200, 120px. 덩굴 식물 배경 이미지. 우측 하단 "01/06" mono.

**Overview**: 좌 5col three.js 책 3D 렌더, 우 7col 본문. 해시태그 `#포스트아포칼립스 #식물 #연대`. 책 hover 시 "CLICK TO ENTER STORY →" 힌트.

**Author**: 좌 5col (이름 + 프로필 200×260 placeholder + 소속), 우 7col (수상 리스트 + 서적 티커). 서적 표지 placeholder 80×112.

**Character**: 상단 캐릭터 상세(좌 이미지 + 우 텍스트) + 하단 4개 프로필 원(96px).

**Theme**: 1200×2100. 3개 장 700px씩. 챕터 번호 mono 240px opacity 0.15.

**Setting**: 4열 카드 그리드. 각 카드: zdog.js 캔버스 자리(1:1) + 용어 설명. "COMING SOON" 배지.

**Media**: 포스터(724/1024) / GIF(1:1) / 북트레일러(16:9). 좌상단 mono 라벨.

**End**: 풀스크린 중앙. "NOW AVAILABLE" + "지구 끝의 온실" + "BUY THE BOOK →" CTA.

---

## 6. 모션 원칙

```
easing-snappy : cubic-bezier(0.19, 1, 0.22, 1)
easing-smooth : cubic-bezier(0.65, 0, 0.35, 1)
fade          : 0.6~0.8s
slide         : 0.8~1.2s
glow-pulse    : 4s infinite loop
ticker        : 28s linear infinite (Author 서적 티커)
```

---

## 7. 커스텀 커서

작은 푸른 원(core) + 파티클 8~12개 lerp 지연. 클릭 가능 요소(`[data-cursor-hover]`) 위에서 1.5배 확장.

---

## 8. 에셋 Placeholder 규칙

모든 미삽입 이미지:
- `border: 1px dashed rgba(79, 195, 247, 0.20~0.30)`
- `background: rgba(10, 14, 42, 0.4~0.5)`
- 내부 라벨: mono 9px, `color: rgba(79, 195, 247, 0.30)`
