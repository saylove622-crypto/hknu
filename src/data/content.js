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
