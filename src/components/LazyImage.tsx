import React, { useEffect, useRef, useState } from 'react';

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

type LazyImageProps = {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  width?: number | string;
  height?: number | string;
};

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  webpSrc,
  alt,
  className = 'block',
  imgClassName,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  sizes,
  width,
  height,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isReady, setIsReady] = useState(loading === 'eager');

  useEffect(() => {
    if (loading === 'eager') return;

    const node = imgRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [loading]);

  const resolvedSrc = isReady ? src : TRANSPARENT_PIXEL;
  const resolvedWebp = isReady ? webpSrc : undefined;
  const resolvedFetchPriority = isReady ? fetchPriority : 'low';

  return (
    <picture className={className}>
      {resolvedWebp && <source type="image/webp" srcSet={resolvedWebp} />}
      <img
        ref={imgRef}
        src={resolvedSrc}
        alt={alt}
        className={imgClassName}
        loading={loading}
        decoding={decoding}
        fetchPriority={resolvedFetchPriority}
        sizes={sizes}
        width={width}
        height={height}
      />
    </picture>
  );
};
