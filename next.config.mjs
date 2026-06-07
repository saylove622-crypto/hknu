/** @type {import('next').NextConfig} */
// GITHUB_ACTIONS 환경변수는 GitHub Actions 워크플로우에서만 자동으로 'true'로 설정됩니다.
// Vercel 배포 환경에서는 이 변수가 없으므로 false가 됩니다.
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  // GitHub Pages 배포(GitHub Actions)일 때만 static export를 사용합니다.
  // Vercel에서는 output을 설정하지 않아 Next.js 서버 모드로 동작합니다.
  ...(isGitHubActions ? { output: 'export' } : {}),
  // GitHub Pages 배포 시에만 /hknu basePath를 적용합니다.
  basePath: isGitHubActions ? '/hknu' : '',
  images: {
    unoptimized: isGitHubActions,
  },
};

export default nextConfig;
