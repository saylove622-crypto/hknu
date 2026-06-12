// src/data/content.js
// 모든 텍스트 콘텐츠 중앙 관리

export const characters = [
  {
    id: 'ayoung',
    name: '아영',
    nameEn: 'Ayoung',
    role: 'Plant Ecologist · 2129',
    description: `2129년 더스트생태연구센터의 연구원. 해월에서 이상 증식하는 모스바나의 비밀을 추적하는 식물생태학자. 괴담에 관심이 많아, 모스바나 사건이 발생하였을 때 괴담 사이트 스트레인지테일즈에서 그 원인을 쫓는다. 그리고 누군가의 흔적을 찾아 '랑가노의 마녀들', 아마라와 나오미를 만나러 떠나는데 …`,
    color: '#4FC3F7',
    initial: '아',
  },
  {
    id: 'jisu',
    name: '지수',
    nameEn: 'Jisu',
    role: 'Engineer · Dust Era',
    description: `과거 더스트 시대, 프림 빌리지의 온실을 만든 정비사. 기적을 믿지 않는 그녀는 프림빌리지라는 이상향과 같은 공간을 발견한다. 그리고 그곳에서 알 수 없는 감정이 느껴지던 레이첼을 만나게 되고, 프림빌리지에 정착하게 되는데…`,
    color: '#80DEEA',
    initial: '지',
  },
  {
    id: 'rachel',
    name: '레이첼',
    nameEn: 'Rachel',
    role: 'Cyborg Botanist · Dust Era',
    description: `과거 더스트 시대, 프림빌리지의 식물을 개량한 사이보그 식물학자. 식물만을 바라보고 연구하던 그녀는 죽음을 계획하고 온실에서 잠이 든다. 그러나 프림빌리지에 새로 들어온 지수에 의해 깨어난 후, 계속 그녀의 삶이 신경쓰이게 되는데…`,
    color: '#E91E63',
    initial: '레',
  },
  {
    id: 'amara-naomi',
    name: '아마라 & 나오미',
    nameEn: 'Amara & Naomi',
    role: 'The Witches of Langano',
    description: `'랑가노의 마녀들'이라 불리며 모스바나를 세상으로 확산시킨 아이들. 과거엔 모스바나의 진실을 알리고 싶어하였으나, 사람들은 진실보다는 믿고싶은 것을 본다는 걸 알게된다. 사람들과 말이 통하지 않는다는 것을 깨닫고 어느 순간부턴 기억을 잃어가는 아마라와, 그녀를 보살피는 나오미. 그러던 그녀들에게 아영이 찾아오는데…`,
    color: '#6B1E5C',
    initial: '마',
  },
];

export const themes = [
  {
    number: '01',
    title: '모스바나',
    titleEn: 'Mosvana',
    quote: '"악마의 식물이 내 정원에 자라고 있는데, 이거 혹시 멸망의 징조 아니야?"',
    description: '덩굴식물이 뻗어 나가는 곳, 그곳에 숨겨진 기묘한 이야기',
  },
  {
    number: '02',
    title: '프림 빌리지',
    titleEn: 'Prim Village',
    quote: '"도대체 어떻게 이런 곳이 있는 거예요? 다 죽었다고 생각했어요. 돔 바깥에서는, 모두 다 죽었다고요."',
    description: '멸망한 세계 속 유일한 도피처, 그리고 비밀스러운 온실',
  },
  {
    number: '03',
    title: '지구 끝의 온실',
    titleEn: 'The Greenhouse at the End of the Earth',
    quote: '"아마도 나는, 그 마음에 대한 이야기를 쓰고 싶었던 것 같다."',
    description: '어떻게 이처럼 작은 우리가 서로를 구할 수 있는 걸까?',
  },
];

export const mediaItems = [
  {
    id: 'poster',
    label: 'Poster',
    type: 'image',
    aspectRatio: '724/1024',
    width: 724,
    height: 1024,
    src: '/images/media/poster.jpg',
    href: null,
  },
  {
    id: 'gif',
    label: 'Motion',
    type: 'gif',
    aspectRatio: '1/1',
    width: 600,
    height: 600,
    src: '/images/media/motion.png',
    href: null,
  },
  {
    id: 'trailer',
    label: 'Trailer',
    type: 'video',
    aspectRatio: '16/9',
    width: 1200,
    height: 675,
    src: '/images/media/thumbnail.jpg',
    href: 'https://youtu.be/EKoZnvKJ7sQ',
  },
];

// 작가 정보
export const authorData = {
  nameKr: '김초엽',
  nameEn: 'Kim Cho Yeop',
  publisher: '블러썸크리에이티브',
  awards: [
    { year: '2023', title: '제34회 은하상 최우수외국작가상' },
    { year: '2021', title: '제62회 한국출판문화상 『사이보그가 되다』' },
    { year: '2021', title: '제19회 한국여성지도자상 젊은지도자상' },
    { year: '2020', title: '제11회 젊은작가상 「인지공간」' },
    { year: '2019', title: '제43회 오늘의 작가상 「우리가 빛의 속도로 갈 수 없다면」' },
    { year: '2017', title: '제2회 한국과학문학상 중단편부문 대상 「관내분실」' },
  ],
  books: [
    { year: '2019', title: '원통 안의 소녀' },
    { year: '2019', title: '우리가 빛의 속도로 갈 수 없다면' },
    { year: '2021', title: '지구 끝의 온실' },
    { year: '2021', title: '방금 떠나온 세계' },
    { year: '2021', title: '행성어 서점' },
    { year: '2021', title: '므레모사' },
    { year: '2022', title: '책과 우연들' },
    { year: '2023', title: '파견자들' },
    { year: '2024', title: '아무튼, SF게임' },
    { year: '2025', title: '양면의 조개껍데기' },
  ],
};

export const siteConfig = {
  title: '지구 끝의 온실',
  titleEn: 'The Greenhouse at the End of the Earth',
  author: '김초엽',
  authorEn: 'Kim Cho-Yeob',
  buyUrl: 'https://product.kyobobook.co.kr/detail/S000001953324',
  trailerUrl: 'https://youtu.be/EKoZnvKJ7sQ',
  // hero는 네비에 미포함 — 로고 클릭으로만 접근
  navItems: [
    { label: 'HOME',    sections: ['overview'] },
    { label: 'AUTHOR',  sections: ['author'] },
    { label: 'STORY',   sections: ['character', 'theme'] },
    { label: 'SETTING', sections: ['setting'] },
    { label: 'MEDIA',   sections: ['media'] },
    { label: 'END',     sections: ['end'] },
  ],
};

// ══════════════════════════════════════════
// 인물관계도 그래프 데이터
// pos.x, pos.y: 캔버스 중심 기준 픽셀 오프셋
// pos.z: CSS translateZ 깊이값 (px) — 3D 패럴렉스
// era: ['dust'] | ['post'] | ['dust','post']
// ══════════════════════════════════════════
export const characterGraph = {
  nodes: [
    {
      id: 'jisu',
      name: '지수 / 이희수',
      nameEn: 'Jisu / Lee Heesu',
      era: ['dust', 'post'],
      pos: { x: -80, y: 20, z: 0 },
      color: '#80DEEA',
      shortDesc: '군 소속 정비사 → 이웃집 할머니 (지수와 동일인물로 시사)',
      description: '더스트 시대에 프림 빌리지를 만들고 운영했던 군 소속 정비사. 더스트 시대 이후 아영이 어렸을 적 살던 마을 온유의 이웃집 할머니로 시사된다. 레이첼에게 처음에는 호기심을, 이후에는 연애감정에 가까울 특별함을 느꼈으며, 정비 도중 레이첼에게 알리지 않고 감정 제어 기능을 활성화시켜 평생 후회와 그리움을 안고 살게 된다.',
      relationships: [
        { target: 'rachel', label: '정비사 ↔ 사이보그 관계 / ???', type: 'special' },
        { target: 'naomi',  label: '레이첼의 식물을 이용한 더스트 분해제 제조법 제자', type: 'transfer' },
        { target: 'danny',  label: '프림 빌리지 운영 보좌', type: 'cooperation' },
        { target: 'ayoung', label: '이웃집 할머니 / 아영이 동경 / 모스바나의 비밀 함께 추적', type: 'bond' },
      ],
    },
    {
      id: 'rachel',
      name: '레이첼',
      nameEn: 'Rachel',
      era: ['dust', 'post'],
      pos: { x: 80, y: 20, z: -20 },
      color: '#E91E63',
      shortDesc: '솔라리타 연구소 출신 사이보그 식물학자',
      description: '신체의 유기물 함량이 30% 미만인 사이보그. 더스트 시대 이전에는 솔라리타라는 연구소에서 연구자로 일했다. 지수에게 호기심에서 시작해 특별함을 느끼게 되었으나, 감정 제어 장치 사건 고백 후 싸운 후 헤어진다. 이희수 사망 시점 이후 이희수의 기억이 담긴 메모리를 아영에게서 양도 받게 된다. 작 마지막에는 영면을 위해 완전 분해를 신청할 것이라는 이야기를 한다.',
      relationships: [
        { target: 'jisu',   label: '호기심 → ??? → 감정 제어 장치 사건 → 싸운 후 헤어짐', type: 'conflict' },
        { target: 'ayoung', label: '이희수의 기억이 담긴 메모리 양도 받음', type: 'transfer' },
      ],
    },
    {
      id: 'naomi',
      name: '나오미',
      nameEn: 'Naomi',
      era: ['dust', 'post'],
      pos: { x: -80, y: -140, z: 10 },
      color: '#A5D6A7',
      shortDesc: '랑카위 연구소 탈출자. "랑가노의 마녀들"',
      description: '프롤로그와 이후 과거 회상의 주 화자. 랑카위 연구소가 무너졌을 때 언니 아마라와 함께 탈출했다. 더스트에 강한 내성을 가지고 있으며, 이희수에게 배운 더스트 분해제로 치료를 이어가면서 아마라와 함께 "랑가노의 마녀들"이라는 별명이 생긴다. 더스트 시대의 미스터리를 풀기 위해 찾아온 아영에게 프림 빌리지와 모스바나의 역사를 알려주었다.',
      relationships: [
        { target: 'amara', label: '자매 / 랑카위 연구소에서 기회를 보고 함께 탈출', type: 'family' },
        { target: 'jisu',  label: '더스트 분해제 제조법 제자', type: 'transfer' },
        { target: 'haru',  label: '처음엔 쌀쌀맞게 대함 → 정찰대 동료 → 친해짐', type: 'bond' },
        { target: 'ayoung','label': '프림 빌리지와 모스바나의 역사, 자신이 알고있는 정보를 알려줌', type: 'transfer' },
      ],
    },
    {
      id: 'amara',
      name: '아마라',
      nameEn: 'Amara',
      era: ['dust', 'post'],
      pos: { x: -240, y: -140, z: -10 },
      color: '#CE93D8',
      shortDesc: '나오미의 언니. "랑가노의 마녀들"',
      description: '나오미의 언니. 랑카위 연구소에서 생체 실험을 당하다가 연구소가 약탈자들에게 습격당해 무너졌을 때 기회를 보고 나오미와 함께 도망쳤다. 나오미에 비해 다소 약한 더스트 내성으로 몸이 약해져 마지막 희망을 찾아 나오미와 함께 프림 빌리지를 찾아 떠났다. 프림 빌리지 붕괴 후 에티오피아로 이동하며 모스바나 확산에 공헌한다.',
      relationships: [
        { target: 'naomi', label: '자매 / 랑가노의 마녀들 / 랑카위 연구소에서 기회를 보고 함께 탈출', type: 'family' },
      ],
    },
    {
      id: 'danny',
      name: '대니',
      nameEn: 'Danny',
      era: ['dust'],
      pos: { x: 240, y: -140, z: 20 },
      color: '#FF8A65',
      shortDesc: '프림 빌리지 촌장 격 / 쿠알라룸프르 뮤지컬 극단 출신',
      description: '프림 빌리지의 촌장 격 인물. 험상궂은 얼굴이라는 묘사가 있으며, 더스트 시대 이전에는 쿠알라룸프르의 뮤지컬 극단에서 무대 관리인으로 일하며 화가로도 활동했다. 레이첼과 이희수를 보좌하는 역할로, 하루의 보호자를 자청한다. 이후 더스트 폭풍을 막아 마을을 구한 모스바나를 챙겨 돔이 형성된 마을에 전달하기 위해 마을을 몰래 떠난다.',
      relationships: [
        { target: 'jisu', label: '프림 빌리지 운영 보좌', type: 'cooperation' },
        { target: 'haru', label: '보호자 자청 / 쿠알라룸프르 뮤지컬 극단에서 처음 만남 / 몰래 떠남', type: 'bond' },
      ],
    },
    {
      id: 'haru',
      name: '하루',
      nameEn: 'Haru',
      era: ['dust'],
      pos: { x: 80, y: -140, z: -15 },
      color: '#FFF176',
      shortDesc: '프림 빌리지 정찰대. 한국 출신. 가창력이 뛰어남',
      description: '프림 빌리지에서 정찰 임무를 맡고 있는 아이. 나오미와 비슷한 또래로 보이며 한국 출신이다. 쿠알라룸프르의 뮤지컬 극단에서 대니와 처음 만났으며, 노래를 부르고 싶어서 입단했고 가창력이 뛰어나다. 대니에게 많이 의지했던 것으로 보이며 대니가 몰래 떠난 후 화를 내며 슬퍼한다.',
      relationships: [
        { target: 'danny', label: '보호자 자청 받음 / 대니 몰래 떠난 후 화를 내며 슬퍼함', type: 'bond' },
        { target: 'naomi', label: '처음엔 쌀쌀맞게 대함 → 정찰대 동료 → 친해짐', type: 'bond' },
      ],
    },
    {
      id: 'ayoung',
      name: '아영',
      nameEn: 'Ayoung',
      era: ['post'],
      pos: { x: 80, y: 180, z: 15 },
      color: '#4FC3F7',
      shortDesc: '더스트생태학자. 더스트생태연구센터 연구원',
      description: '이 소설의 주 화자 중 하나. 더스트생태학자. 어렸을 적 살던 온유라는 마을에서 이희수와 만나게 되며, 파란 불빛의 먼지를 만드는 잡초 사이에 앉아있던 이희수를 보고 강한 인상을 가지게 된다. 이후 이희수와 푸른 불빛을 내는 모스바나의 과거를 더듬어가며 더스트 시대의 비밀 하나를 밝혀내고, 학계에 공표하게 된다.',
      relationships: [
        { target: 'jisu',   label: '이웃집 할머니 / 동경 / 모스바나의 비밀 함께 추적 → 학계에 공표', type: 'bond' },
        { target: 'yunjae', label: '선배 / 친한 동료', type: 'bond' },
        { target: 'naomi',  label: '더스트 시대의 미스터리를 풀기 위해 찾아감', type: 'bond' },
        { target: 'rachel', label: '이희수의 기억이 담긴 메모리 양도', type: 'transfer' },
      ],
    },
    {
      id: 'yunjae',
      name: '윤재',
      nameEn: 'Yunjae',
      era: ['post'],
      pos: { x: -80, y: 180, z: 5 },
      color: '#FFCC80',
      shortDesc: '더스트생태학자. 아영의 선배',
      description: '더스트생태학자. 아영의 선배이며, 아영이 가끔 음모론 사이트를 읽으며 스트레스를 푸는 것을 보고 놀릴 정도로 친한 사이. 다소 중성적인 이름 탓에 헷갈리지만 아영이 언니라고 지칭하는 것을 보면 여성으로 보인다.',
      relationships: [
        { target: 'ayoung', label: '선배 / 친한 동료', type: 'bond' },
      ],
    },
  ],

  edges: [
    { from: 'jisu',   to: 'rachel', label: '정비사↔사이보그 / ???',                   era: ['dust'],         type: 'special' },
    { from: 'rachel', to: 'jisu',   label: '호기심→???→싸운 후 헤어짐',               era: ['dust'],         type: 'conflict' },
    { from: 'jisu',   to: 'naomi',  label: '더스트 분해제 제조법 제자',                era: ['dust'],         type: 'transfer' },
    { from: 'jisu',   to: 'danny',  label: '프림 빌리지 운영 보좌',                    era: ['dust'],         type: 'cooperation' },
    { from: 'naomi',  to: 'amara',  label: '자매 / 랑카위 연구소에서 함께 탈출',       era: ['dust', 'post'], type: 'family' },
    { from: 'danny',  to: 'haru',   label: '보호자 자청',                              era: ['dust'],         type: 'bond' },
    { from: 'naomi',  to: 'haru',   label: '정찰대 동료',                              era: ['dust'],         type: 'bond' },
    { from: 'ayoung', to: 'jisu',   label: '이웃집 할머니 / 동경',                     era: ['post'],         type: 'bond' },
    { from: 'ayoung', to: 'naomi',  label: '프림 빌리지와 모스바나의 역사 정보 수신',  era: ['post'],         type: 'transfer' },
    { from: 'ayoung', to: 'rachel', label: '이희수의 기억이 담긴 메모리 양도',         era: ['post'],         type: 'transfer' },
    { from: 'ayoung', to: 'yunjae', label: '선배 / 친한 동료',                         era: ['post'],         type: 'bond' },
  ],
};
