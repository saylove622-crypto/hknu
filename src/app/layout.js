import './globals.css';

export const metadata = {
  title: '지구 끝의 온실 — 김초엽',
  description: '인류를 대멸종으로 몰고 간 더스트 폭풍 이후, 재건된 세계에서 발견된 기묘한 식물과 과거의 진실을 추적하는 이야기. 김초엽 장편소설.',
  keywords: ['지구 끝의 온실', '김초엽', '포스트아포칼립스', '소설', '한국SF'],
  openGraph: {
    title: '지구 끝의 온실',
    description: '인류를 대멸종으로 몰고 간 더스트 폭풍 이후, 기묘한 식물과 과거의 진실을 추적하는 이야기.',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
