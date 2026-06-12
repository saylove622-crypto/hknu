# 지구 끝의 온실 — 마이크로사이트

『지구 끝의 온실』(김초엽 저) 팬 마이크로사이트 MVP 프로젝트.

## 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)으로 접속.

> 디자인 상세 (컬러, 타이포, 모션, 에셋 목록 등)는 [DESIGN.md](./DESIGN.md) 참고.

---

# 기획서 (MVP)

## 1부. UX Flow

### 1.1 사이트 구조 (IA)

총 **8개 섹션**의 풀스크롤 싱글 페이지 사이트. 상단 네비게이터로 챕터 점프 가능, 자연 스크롤 시에도 각 섹션이 순차적으로 흐름.

```
[ Top Nav: HOME · AUTHOR · STORY · SETTING · MEDIA · END ]
  ↑ glow line + 따라가는 원. HERO는 로고 클릭으로만 재실행.

0. HERO     ──────────────  인트로 줌 페럴렉스 + 시네마틱 인용구
             (네비 미표시, 로고 클릭 시 실행)

1. HOME     / overview ───  작품 소개 + 책 3D 렌더 (클릭 → STORY 이동)
2. AUTHOR   / author ─────  작가 소개 (프로필 + 수상 내역 + 출판 서적 티커)
3. STORY    / character ──  4인 캐릭터 (인터랙티브 프로필)
            / theme ──────  3개 장 (세로 패럴렉스)
4. SETTING  / setting ────  세계관 사전 (zdog.js, 추후 구현)
5. MEDIA    / media ──────  포스터 / GIF / 북트레일러
6. END      / end ────────  구매 링크
```

### 1.2 네비게이션 동작

상단 고정 네비게이터에 6개 그룹 라벨(HOME, AUTHOR, STORY, SETTING, MEDIA, END)이 얇은 horizontal line으로 연결. 현재 섹션 위치에 푸른 glow 원(circle)이 line을 따라 부드럽게 슬라이드.

- **로고 클릭**: Hero 섹션으로 스크롤 이동 (인트로 재실행)
- **네비 클릭**: 인트로 재생 중이어도 즉시 스킵하고 해당 섹션으로 이동

### 1.3 글로벌 인터랙션

마우스 포인터는 시스템 커서를 숨기고 커스텀 커서로 대체. 작은 푸른 원(core)이 마우스를 즉시 따라오고, 그 뒤로 파티클 8~12개가 lerp 지연을 두고 흩어지며 따라옴.

스크롤은 Lenis로 부드러운 관성 적용.

### 1.4 섹션별 사용자 동작 시나리오

**Section 0 — Hero (지구 끝의 온실)**
사용자 진입 → 어두운 밤 화면에 덩굴 식물 푸른빛이 서서히 켜짐 → 제목 타이포가 split 애니메이션으로 한 글자씩 등장 → 사용자가 스크롤 시작 → 배경 zoom-in 페럴렉스 → 인용구 3개 순차 표시 → 자동으로 Overview로 이동.
→ **네비 클릭 시 즉시 스킵하고 해당 섹션으로 이동 가능.**

**Section 1 — Overview**
좌측에 책 3D 렌더(WebGL/three.js), 우측에 작품 소개 텍스트.
→ **책 클릭 시 Story(Character) 섹션으로 이동.**

**Section 2 — Author**
좌: 작가 이름 + 프로필 이미지 프레임 + 소속.  
우: 수상 내역(연도별) + 출판 서적 티커(자동 스크롤).

**Section 3 — Character**
초기 상태: 안내 텍스트 + 4인 캐릭터 프로필 원형 버튼. 클릭 시 상세 정보 표시. 다이얼로그 이벤트(레이첼, 아마라&나오미).

**Section 4 — Theme**
3개 장(章)이 세로로 배치. 스크롤 시 vertical parallax. 배경 별 입자 부유.

**Section 5 — Setting** *(추후 구현)*
세계관 사전: 더스트 폴 / 내성종 / 돔 / 모스바나. zdog.js 3D 오브젝트 예정.

**Section 6 — Media**
3개 미디어 블록: 포스터(16:9), GIF(1:1), 북트레일러(16:9). 북트레일러 클릭 시 YouTube.

**Section 7 — End**
중앙 "BUY THE BOOK" CTA. 교보문고 링크.

### 1.5 반응형 정책 (MVP)

데스크탑 1280px 기준. **1200×700 뷰포트에서도 2컬럼 레이아웃 유지.** 860px 이하에서 단일 컬럼 전환. 모바일은 MVP 범위 외.

---

## 2부. 폴더 구조

```
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── Cursor.jsx           ← 파티클 커서
│   ├── Navigator.jsx        ← 상단 glow line nav (6항목)
│   └── sections/
│       ├── Hero.jsx         ← 인트로 (네비 미표시, 로고 클릭)
│       ├── Overview.jsx     ← 작품소개 (책 클릭 → Story)
│       ├── Author.jsx       ← 작가소개 [신규]
│       ├── Character.jsx    ← 캐릭터
│       ├── Theme.jsx        ← 챕터
│       ├── Setting.jsx      ← 세계관사전 placeholder [신규]
│       ├── Media.jsx        ← 미디어
│       └── End.jsx          ← 구매링크
├── lib/
│   └── lenis.js
├── styles/
│   ├── tokens.css
│   └── grid.css
└── data/
    └── content.js           ← navItems(6), authorData, characters, themes, mediaItems

public/
├── images/
│   ├── hero/bg.jpg, fg.png
│   ├── media/poster.jpg, motion.png, thumbnail.jpg
│   └── author/           ← 추후 프로필 이미지
├── models/               ← book.glb
└── textures/paper-noise.webp
```

---

## 3부. 기술 스택

| 분류 | 기술 |
|---|---|
| Framework | Next.js (App Router) |
| Styling | CSS Variables + CSS Modules |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| 3D | three.js + @react-three/fiber |
| 세계관사전(예정) | zdog.js |
| Deploy | GitHub Pages / Vercel |

---

## 4부. 이미지/에셋 Placeholder 목록

개발 중 모든 이미지 영역은 dashed border + 영역명 라벨로 처리.

| # | 용도 | 비율/크기 |
|---|---|---|
| 1 | Hero 배경 이미지 | 1920×1080 |
| 2 | Hero 전경 식물 | 1920×1080 (PNG, 투명) |
| 3 | 책 3D 모델 | .glb |
| 4 | 작가 프로필 사진 | 200×260 |
| 5 | 출판 서적 표지 10종 | 80×112 (4:5.6 비율) |
| 6 | 캐릭터 프로필 사진 4종 | 96×96 (원형) |
| 7 | 캐릭터 상세 이미지 4종 | 480×560 |
| 8 | Theme 장식 일러스트 3종 | 자유 비율 |
| 9 | 포스터 | 724×1024 |
| 10 | GIF/모션 | 600×600 |
| 11 | 북트레일러 썸네일 | 1200×675 |

---

## 5부. 구현된 인터랙션 (상세)

### 1. 인트로 다중 레이어 줌 패럴렉스 (Hero)
- 다중 레이어 구성 + 스크롤 고정 (Scroll Pinning)
- 인용구 3단계 페이드 인/아웃 시퀀스
- **네비게이터 클릭 시 즉시 스킵** (`hero:skip` CustomEvent)
- 로고 클릭 시 Hero로 재이동 가능

### 2. Overview 책 인터랙션
- three.js 3D 책 렌더 (마우스 방향 기울기 + 빛 반사)
- **책 클릭 시 Story(Character) 섹션으로 이동**
- hover 시 "CLICK TO ENTER STORY →" 힌트 표시

### 3. Author 섹션
- 수상 내역 리스트 (연도 + 수상명, 6개)
- 출판 서적 티커 (10권 × CSS marquee 애니메이션, hover 시 일시정지)
- 프로필 이미지 / 서적 표지 placeholder 프레임

### 4. 브로큰 그리드 및 스크롤 패럴렉스 (Theme)
- GSAP + ScrollTrigger 연동 vertical parallax
- 배경 투명 일러스트 + 별 입자 부유

### 5. 캐릭터 돌발이벤트 다이얼로그 (Character)
- 레이첼: 1단 팝업, 아마라&나오미: 7단계 스토리 선택지
- React Portal로 화면 정중앙 고정
- 다이얼로그 종료 후 상세 카드 자동 활성화

### 6. Setting 세계관 사전 (예정)
- zdog.js 3D 오브젝트: 더스트 폴 / 내성종 / 돔 / 모스바나
- 현재 텍스트 placeholder + "COMING SOON" 표시

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
