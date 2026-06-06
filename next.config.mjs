/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // GitHub Pages 레포지토리 이름이 hknu 이므로 빌드 시 경로에 붙여줍니다.
  basePath: isProd ? '/hknu' : '',
  images: {
    unoptimized: true, // static export에서는 이미지 최적화를 꺼주어야 빌드됩니다.
  },
};

export default nextConfig;
