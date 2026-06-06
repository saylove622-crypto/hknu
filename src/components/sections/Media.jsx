'use client';

import { useRef, useState, useEffect } from 'react';
import { mediaItems } from '@/data/content';
import styles from './Media.module.css';

function PlayIcon() {
  return (
    <svg
      className={styles.playIcon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" />
      <polygon
        points="19,14 35,24 19,34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MediaItem({ item }) {
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // React 하이드레이션 이전에 이미지가 에러 난 경우 처리 (hydration race condition 방지)
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth === 0) {
      setHasError(true);
    }
  }, [item.src]);

  const handleImageError = () => {
    setHasError(true);
  };

  const showImage = item.src && !hasError;

  return (
    <div className={styles.mediaItem}>
      {/* 라벨 */}
      <div className={styles.mediaLabel}>{item.label}</div>

      {/* 미디어 블록 */}
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.mediaBlock} ${styles.mediaBlockLink}`}
          data-cursor-hover
          aria-label={`${item.label} 보기 — 새 탭에서 열림`}
        >
          {item.src && (
            <img
              ref={imgRef}
              src={item.src}
              alt={item.label}
              className={styles.mediaImage}
              style={showImage ? {} : { display: 'none' }}
              onError={handleImageError}
            />
          )}
          <div
            className={styles.mediaPlaceholder}
            style={showImage ? { display: 'none' } : {}}
            data-label={`${item.label.toUpperCase()} — ${item.width}×${item.height}`}
          >
            <div className={styles.placeholderDim} />
            <span className={styles.placeholderText}>{item.label.toUpperCase()}</span>
          </div>
          {item.type === 'video' && (
            <div className={styles.playOverlay}>
              <PlayIcon />
            </div>
          )}
          <div className={styles.hoverFrame} />
        </a>
      ) : (
        <div className={styles.mediaBlock}>
          {item.src && (
            <img
              ref={imgRef}
              src={item.src}
              alt={item.label}
              className={styles.mediaImage}
              style={showImage ? {} : { display: 'none' }}
              onError={handleImageError}
            />
          )}
          <div
            className={styles.mediaPlaceholder}
            style={showImage ? { display: 'none' } : {}}
            data-label={`${item.label.toUpperCase()} — ${item.width}×${item.height}`}
          >
            <div className={styles.placeholderDim} />
            <span className={styles.placeholderText}>{item.label.toUpperCase()}</span>
          </div>
          <div className={styles.hoverFrame} />
        </div>
      )}
    </div>
  );
}

export default function Media() {
  return (
    <section
      id="media"
      className={styles.section}
      aria-label="Media — 미디어"
    >
      <div className={styles.container}>
        {/* 섹션 헤더 */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Media</span>
          <div className={styles.sectionLine} />
          <span className={styles.sectionNum}>05 / 06</span>
        </div>

        {/* 미디어 블록들 */}
        <div className={styles.mediaList}>
          {mediaItems.map((item) => (
            <MediaItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
