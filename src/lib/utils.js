// GitHub Pages 배포 시 basePath인 '/hknu'를 경로 앞에 추가해 주는 헬퍼 함수입니다.
export function getAssetPath(path) {
  if (!path) return '';
  
  // 외부 링크나 절대 경로는 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // GITHUB_ACTIONS 환경변수는 GitHub Actions에서만 'true'로 설정되며,
  // Vercel 및 로칼 환경에서는 undefined입니다.
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
  const basePath = '/hknu';
  
  // GitHub Actions(GitHub Pages) 배포 환경에서 '/'(로컬 실제 콘텐츠 경로))로 시작하고 '/hknu'로 시작하지 않는 경우 basePath 추가
  if (isGitHubActions && path.startsWith('/') && !path.startsWith(basePath)) {
    return `${basePath}${path}`;
  }
  
  return path;
}
