import { useState, useEffect } from 'react';

// Utility to check browser support for modern image formats
export function checkImageFormatSupport() {
  const formats = {
    webp: false,
    avif: false,
    jp2: false,
  };

  // Check WebP support
  const webpCanvas = document.createElement('canvas');
  webpCanvas.width = 1;
  webpCanvas.height = 1;
  formats.webp = webpCanvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;

  // Check AVIF support (more complex, using feature detection)
  const avifSupport = new Promise<boolean>((resolve) => {
    const avifImg = new Image();
    avifImg.onload = () => resolve(true);
    avifImg.onerror = () => resolve(false);
    avifImg.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });

  return { ...formats, avif: avifSupport };
}

// Smart image component with format optimization
interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: 'high' | 'low' | 'auto';
  sizes?: string;
  quality?: number;
}

export function SmartImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  priority = 'auto',
  sizes,
  quality = 80,
}: SmartImageProps) {
  const [supportedFormats, setSupportedFormats] = useState<{
    webp: boolean;
    avif: boolean | Promise<boolean>;
    jp2: boolean;
  }>({ webp: false, avif: false, jp2: false });

  const [avifSupported, setAvifSupported] = useState(false);

  useEffect(() => {
    const formats = checkImageFormatSupport();
    setSupportedFormats(formats);

    if (formats.avif instanceof Promise) {
      formats.avif.then(setAvifSupported);
    }
  }, []);



  // Generate optimized image URL based on supported formats
  const getOptimizedSrc = () => {
    if (avifSupported) {
      return getOptimizedImageUrl(src, { format: 'avif', quality });
    } else if (supportedFormats.webp) {
      return getOptimizedImageUrl(src, { format: 'webp', quality });
    }
    return src;
  };

  return {
    src: getOptimizedSrc(),
    alt,
    className,
    loading,
    ...(priority !== 'auto' && { fetchPriority: priority }),
    sizes,
  };
}

// Utility function to optimize image URLs
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  } = {}
): string {
  const { width, height, quality = 80, format = 'auto' } = options;

  // Handle Unsplash images
  if (src.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    params.set('q', quality.toString());
    params.set('fit', 'crop');
    
    if (format !== 'auto') {
      params.set('fm', format);
    } else {
      params.set('fm', 'webp');
    }
    
    return `${src}?${params.toString()}`;
  }

  // Handle local images - you would implement this based on your build process
  if (src.startsWith('/')) {
    const srcWithoutExt = src.replace(/\.[^/.]+$/, '');
    let suffix = '';
    
    if (width) suffix += `-${width}w`;
    if (height) suffix += `-${height}h`;
    
    let ext = '.jpg';
    if (format === 'webp') ext = '.webp';
    else if (format === 'avif') ext = '.avif';
    
    return `${srcWithoutExt}${suffix}${ext}`;
  }

  return src;
}

// Hook for responsive images
export function useResponsiveImage(src: string) {
  const [currentSrc, setCurrentSrc] = useState(src);
  
  useEffect(() => {
    const updateSrc = () => {
      const width = window.innerWidth;
      let targetWidth = 1920;
      
      if (width <= 480) targetWidth = 480;
      else if (width <= 768) targetWidth = 768;
      else if (width <= 1024) targetWidth = 1024;
      else if (width <= 1280) targetWidth = 1280;
      
      const optimizedSrc = getOptimizedImageUrl(src, { 
        width: targetWidth,
        format: 'auto' 
      });
      
      setCurrentSrc(optimizedSrc);
    };
    
    updateSrc();
    window.addEventListener('resize', updateSrc);
    
    return () => window.removeEventListener('resize', updateSrc);
  }, [src]);
  
  return currentSrc;
}

// Image compression utility for file uploads
export function compressImage(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: string;
  } = {}
): Promise<Blob> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8, format = 'image/jpeg' } = options;
  
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          resolve(blob!);
        },
        format,
        quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
}
