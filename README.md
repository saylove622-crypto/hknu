# 지구 끝의 온실 — 마이크로사이트

『지구 끝의 온실』(김초엽 저) 팬 마이크로사이트 MVP 프로젝트.

## 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)으로 접속.

---

# 기획서 (MVP)

## 1부. UX Flow

### 1.1 사이트 구조 (IA)

총 6개 섹션의 풀스크롤 싱글 페이지 사이트. 상단 네비게이터로 챕터 점프 가능, 자연 스크롤 시에도 각 섹션이 순차적으로 흐름.

```
[ Top Nav: HOME · STORY · MEDIA · END ] ← glow line + 따라가는 원

1. HOME / Hero ──────────  지구 끝의 온실 (zoom parallax)
2. HOME / Overview ──────  작품 소개 + 책 3D 렌더
3. STORY / Character ────  4인 캐릭터 (인터랙티브 프로필)
4. STORY / Theme ────────  3개 장 (세로 패럴렉스)
5. MEDIA ────────────────  포스터 / GIF / 북트레일러
6. END ──────────────────  구매 링크
```

### 1.2 네비게이션 동작

상단 고정 네비게이터에 4개 그룹 라벨(HOME, STORY, MEDIA, END)이 얇은 horizontal line으로 연결되어 있고, 현재 섹션 위치에 푸른 glow 원(circle)이 line을 따라 부드럽게 슬라이드. 챕터가 바뀔 때 원이 다음 노드로 이동하면서 잔광(after-glow)이 0.6초 정도 남도록 함. 클릭 시 해당 섹션으로 smooth scroll.

### 1.3 글로벌 인터랙션

마우스 포인터는 시스템 커서를 숨기고 커스텀 커서로 대체. 작은 푸른 원(core)이 마우스를 즉시 따라오고, 그 뒤로 파티클 8~12개가 lerp 지연을 두고 흩어지며 따라옴. 클릭 가능한 요소 위에서는 커서가 1.5배로 확장되며 파티클 밀도 증가.

스크롤은 Lenis로 부드러운 관성 적용. 페이지 진입 시 0.8초 페이드인 후 hero가 천천히 모습을 드러냄.

### 1.4 섹션별 사용자 동작 시나리오

**Section 1 — Hero (지구 끝의 온실)**  
사용자 진입 → 어두운 밤 화면에 덩굴 식물 푸른빛이 서서히 켜짐 → 제목 타이포가 split 애니메이션으로 한 글자씩 등장 → 사용자가 스크롤 시작 → 배경은 fixed로 고정된 채 배경 이미지가 zoom-in(parallax) → 일정 임계점 도달 시 Section 2로 자연스럽게 전환.

**Section 2 — Overview**  
좌측에 책 3D 렌더(WebGL/three.js), 우측에 작품 소개 텍스트. 사용자가 마우스를 책 위에 올리면 책이 마우스 방향으로 살짝 기울며 표지의 빛 반사가 움직임. 텍스트 영역은 스크롤 진입 시 라인이 좌→우로 그어지며 본문이 차례로 fade up.

**Section 3 — Character**  
초기 상태: 상단 영역이 안내 텍스트, 하단에 동그란 캐릭터 프로필 4개가 가로로 정렬. 프로필 원 클릭 → 상단이 좌측 캐릭터 이미지 + 우측 설명 텍스트로 분할되어 페이드인. 선택된 프로필 원은 푸른 glow ring으로 활성 상태 표시.

**Section 4 — Theme**  
3개 장(章)이 세로로 길게 배치. 스크롤 시 각 장의 제목/인용구/설명이 서로 다른 속도로 움직이는 vertical parallax. 배경에 미세한 별 입자 부유.

**Section 5 — Media**  
3개 미디어 블록: 포스터(16:9), GIF(1:1), 북트레일러(16:9). 북트레일러 클릭 시 새 탭으로 https://youtu.be/EKoZnvKJ7sQ 이동. 각 블록 hover 시 얇은 라인 프레임이 글로우.

**Section 6 — End**  
중앙에 "BUY THE BOOK" CTA. 클릭 시 새 탭으로 https://product.kyobobook.co.kr/detail/S000001953324 이동. 배경에 hero의 푸른빛 잔향.

### 1.5 반응형 정책 (MVP)

데스크탑 1280px 기준으로 우선 설계. 태블릿(768~1279)은 그리드만 자연 축소. 모바일은 MVP 범위 외(2차 작업). 진입 시 "데스크탑 환경 권장" 안내 표시.

---

## 2부. Visual Design Flow

### 2.1 컬러 시스템

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

### 2.2 타이포그래피

```css
--font-display-kr   : 'Pretendard', 'Noto Serif KR'
--font-body-kr      : 'Pretendard', sans-serif
--font-display-en   : 'Fraunces', 'Cormorant Garamond'
--font-mono         : 'JetBrains Mono'

/* 타입 스케일 (1280 기준) */
hero-title    : 120px / weight 200 / letter-spacing -0.02em
section-title :  64px / weight 300
chapter-title :  40px / weight 400
body-large    :  18px / weight 400 / line-height 1.7
body          :  15px / weight 400 / line-height 1.8
caption/meta  :  12px / mono / tracking 0.15em / uppercase
```

### 2.3 그리드 & 레이아웃

12 column grid, gutter 24px, 최대 콘텐츠 폭 1200px, 좌우 safe margin 40px. 코너 라운드 0px. 모든 박스는 1px hairline border(`var(--color-line)`) 구획.

### 2.4 글래스모피즘 규칙 (제한적 적용)

```css
background: rgba(10, 14, 42, 0.35);
backdrop-filter: blur(20px) saturate(140%);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 0;
```

### 2.5 섹션별 비주얼 설계

**Section 1 — Hero**: 풀스크린. 제목 "지구 끝의 온실" weight 200, 120px. 덩굴 식물 배경 이미지(placeholder). 우측 하단 "01 / 06" mono.

**Section 2 — Overview**: 좌 6col three.js 책 3D 렌더(480×640), 우 6col 본문. 해시태그 `#포스트아포칼립스 #식물 #연대`.

**Section 3 — Character**: 상단 8row(560px) + 하단 2row(140px). 프로필 원 96px. 클릭 시 좌 5col 이미지 + 우 7col 텍스트.

**Section 4 — Theme**: 1200×2100. 3개 장 700px씩. 챕터 번호 mono 240px opacity 0.15.

**Section 5 — Media**: 포스터(16:9) / GIF(1:1) / 북트레일러(16:9). 좌상단 mono 라벨.

**Section 6 — End**: 풀스크린 중앙. "NOW AVAILABLE" + "지구 끝의 온실" + "BUY THE BOOK →" CTA.

### 2.6 모션 원칙

```
easing-snappy : cubic-bezier(0.19, 1, 0.22, 1)
easing-smooth : cubic-bezier(0.65, 0, 0.35, 1)
fade          : 0.6~0.8s
slide         : 0.8~1.2s
glow-pulse    : 4s infinite loop
```

---

## 3부. 폴더 구조

```
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── Cursor.js           ← 파티클 커서
│   ├── Navigator.js        ← 상단 glow line nav
│   └── sections/
│       ├── Hero.js
│       ├── Overview.js
│       ├── Character.js
│       ├── Theme.js
│       ├── Media.js
│       └── End.js
├── lib/
│   └── lenis.js
├── styles/
│   ├── tokens.css          ← 컬러/타이포 변수
│   └── grid.css
└── data/
    └── content.js          ← 모든 텍스트 한곳에 관리

public/
├── images/                 ← 추후 첨부
├── models/                 ← book.glb 자리
└── textures/
    └── paper-noise.webp
```

---

## 4부. 기술 스택

| 분류 | 기술 |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | CSS Variables + Vanilla CSS |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| 3D | three.js + @react-three/fiber |
| Deploy | Vercel |

---

## 5부. 이미지/에셋 Placeholder 목록

개발 중 모든 이미지 영역은 딥 네이비 박스 + dashed border + 영역명 라벨로 처리.

| # | 용도 | 비율/크기 |
|---|---|---|
| 1 | Hero 배경 이미지 (덩굴/푸른빛) | 1920×1080 |
| 2 | 책 3D 모델 (.glb) | — |
| 3 | 캐릭터 프로필 사진 4종 | 96×96 (원형) |
| 4 | 캐릭터 상세 이미지 4종 | 480×560 |
| 5 | Theme 장식 일러스트 3종 | 자유 비율 |
| 6 | 포스터 | 1200×675 |
| 7 | GIF | 600×600 |
| 8 | 북트레일러 썸네일 | 1200×675 |
| 9 | 종이 질감 노이즈 | 1024×1024 tileable |

---

## 캐릭터 소개

**아영**: 2129년 더스트생태연구센터의 연구원. 해월에서 이상 증식하는 모스바나의 비밀을 추적하는 식물생태학자.

**지수**: 과거 더스트 시대, 프림 빌리지의 온실을 만든 정비사.

**레이첼**: 과거 더스트 시대, 프림빌리지의 식물을 개량한 사이보그 식물학자.

**아마라 & 나오미**: '랑가노의 마녀들'이라 불리며 모스바나를 세상으로 확산시킨 아이들.

## 챕터 소개

**1장 모스바나**: 덩굴식물이 뻗어 나가는 곳, 그곳에 숨겨진 기묘한 이야기

**2장 프림 빌리지**: 멸망한 세계 속 유일한 도피처, 그리고 비밀스러운 온실

**3장 지구 끝의 온실**: 어떻게 이처럼 작은 우리가 서로를 구할 수 있는 걸까?

---

## 6부. 구현된 인터랙션 및 특수 기능 (상세 기능 목록)

### 1. 인트로 다중 레이어 줌 페럴렉스 (Hero 섹션)
- **다중 레이어 배치**: 배경 그라데이션 레이어 위에 1번 배경 이미지, 중앙 타이포그래피, 2번 전경 이미지 순으로 다중 레이어를 구성하여 깊이감 있는 줌 페럴렉스 모션 구현.
- **스크롤 고정 (Scroll Pinning)**: 줌 페럴렉스가 완전히 완료될 때까지 브라우저 화면 스크롤이 아래로 내려가지 않도록 고정 제어.
- **내레이션 페이드 인/아웃**: 페럴렉스가 완료된 후 3단계 인용구 문구("비가 내리고...", "더스트는...", "이곳은...")가 차례대로 페이드 인/아웃 애니메이션으로 노출된 뒤, 다음 섹션으로 스크롤 고정이 풀리며 부드럽게 이동.

### 2. 브로큰 그리드 및 스크롤 페럴렉스 (Theme 섹션)
- **부드러운 모션 최적화**: GSAP 및 ScrollTrigger 연동 시 발생하던 타이포 모션의 끊김 현상을 해결하여 프레임 레이트 안정화.
- **그리드 레이아웃 개선**: 텍스트와 본문, 숫자가 서로 겹치지 않도록 배치를 조율하고 프레임 너비를 충분히 확보하여 소제목 줄바꿈 현상 방지.
- **배경 투명도 및 페럴렉스**: 배경에 투명도를 낮춘 일러스트 사진을 삽입하고, 스크롤 속도 차이를 둔 세로 페럴렉스 애니메이션 적용.

### 3. 캐릭터 돌발이벤트 다이얼로그 시스템 (Character 섹션)
- **첫 클릭 돌발 이벤트**: 다이어리 이벤트가 정의된 캐릭터(`레이첼`, `아마라&나오미`)는 최초 클릭 시 프로필 원형 버튼에 펄스 애니메이션과 느낌표(`!`) 배지로 유저의 클릭 유도.
- **다이얼로그 시퀀스 및 선택지**:
  - `레이첼`: 1단 구성의 심플한 다이얼로그 팝업 노출.
  - `아마라&나오미`: 총 7단계의 스토리 대사와 함께 사용자의 선택지 버튼("이게 마지막이 아니야.", "......")을 통한 인터랙션 구성.
- **디자인 및 레이아웃 (중앙 정렬)**:
  - 심플한 격자선 중심의 글래스모피즘(Glassmorphism) 스타일을 적용하여 일관성 유지.
  - 부모의 CSS `transform` 속성으로 인해 발생하던 팝업 고정 좌표 문제를 **React Portal**을 도입하여 `document.body`로 직접 마운트함으로써 해결, 화면의 완전한 정중앙에 정렬되도록 수정.
- **자동 상세 카드 연동**: 다이얼로그를 모두 닫으면 즉시 해당 캐릭터의 상세 소개 정보 카드가 활성화되어 전환.

### 4. 타이포그래피 & 가독성 최적화
- **문해모노체 자간 축소**: 디자인 가이드라인에 맞추어 문해모노체 텍스트들의 자간을 기존 대비 70% 수준(자간 -15)으로 축소하여 글꼴의 밀도와 미감을 살림.
- **주요 타이포 자간 추가 조정**: 스토리 섹션의 소제목, 부제목, 주요 타이틀 자간을 추가로 -10씩 줄여 여백을 정리함.

