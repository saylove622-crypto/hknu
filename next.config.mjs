/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';

const nextConfig = {
  output: 'export',
  // GitHub Pages 배포 시에만 /hknu basePath를 적용하고, 로컬 및 Vercel 배포 시에는 제외합니다.
  basePath: isProd && !isVercel ? '/hknu' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
