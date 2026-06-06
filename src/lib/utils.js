// GitHub Pages 배포 시 basePath인 '/hknu'를 경로 앞에 추가해 주는 헬퍼 함수입니다.
export function getAssetPath(path) {
  if (!path) return '';
  
  // 외부 링크나 절대 경로는 그대로 반환
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = '/hknu';
  
  // 배포 모드(production)이고 '/'로 시작하고 '/hknu'로 시작하지 않는 로컬 경로인 경우 basePath 추가
  if (isProd && path.startsWith('/') && !path.startsWith(basePath)) {
    return `${basePath}${path}`;
  }
  
  return path;
}
