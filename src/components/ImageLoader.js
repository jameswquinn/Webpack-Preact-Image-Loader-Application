import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import PropTypes from 'prop-types';
import '../styles/ImageLoader.css';

const ImageLoader = ({
  src,
  lowResSrc,
  webpSrc,
  jpg,
  png,
  alt,
  className,
  style,
  sizes,
  srcSet,
  retryLimit = 3,
  retryDelay = 2000,
  blurUpAmount = 20,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [blurAmount, setBlurAmount] = useState(blurUpAmount);
  const imgRef = useRef(null);

  const isLowBandwidth = useCallback(() => {
    if ('connection' in navigator) {
      const { effectiveType, saveData } = navigator.connection;
      return saveData || effectiveType === 'slow-2g' || effectiveType === '2g';
    }
    return false;
  }, []);

  const isWebPSupported = useCallback(() => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }, []);

  const loadIntersectionObserver = useCallback(async () => {
    if (!('IntersectionObserver' in window)) {
      try {
        await import('intersection-observer-polyfill');
      } catch (error) {
        console.error('Failed to load IntersectionObserver polyfill:', error);
        setLoading(false);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoading(false);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const loadProgressively = useCallback((img) => {
    let currentBlur = blurUpAmount;
    const interval = setInterval(() => {
      currentBlur -= 2;
      if (currentBlur <= 0) {
        clearInterval(interval);
        setBlurAmount(0);
      } else {
        setBlurAmount(currentBlur);
      }
    }, 50);

    img.onload = () => {
      setLoading(false);
      clearInterval(interval);
      setBlurAmount(0);
    };
  }, [blurUpAmount]);

  const retryLoading = useCallback(async () => {
    if (retryCount >= retryLimit) {
      setError(true);
      return;
    }

    setRetryCount(prevCount => prevCount + 1);

    if (imageSrc.endsWith('.webp')) {
      if (jpg) {
        setImageSrc(jpg);
      } else if (png) {
        setImageSrc(png);
      } else {
        try {
          const WebPHero = await import('webp-hero');
          const webpHero = new WebPHero.WebpMachine();
          await webpHero.polyfillDocument();
        } catch (error) {
          console.error('Failed to load WebP polyfill:', error);
          setError(true);
        }
      }
    } else if (imageSrc.endsWith('.jpg') && png) {
      setImageSrc(png);
    } else {
      setError(true);
    }
  }, [imageSrc, jpg, png, retryCount, retryLimit]);

  useEffect(() => {
    let isMounted = true;
    let retryTimeoutId;

    const loadImage = async () => {
      try {
        if ('loading' in HTMLImageElement.prototype) {
          const img = new Image();
          img.src = src;
          img.loading = 'lazy';
          loadProgressively(img);
        } else {
          await loadIntersectionObserver();
        }

        if (!isMounted) return;

        if (isLowBandwidth()) {
          setImageSrc(lowResSrc || src);
        } else if (isWebPSupported() && webpSrc) {
          setImageSrc(webpSrc);
        } else {
          setImageSrc(src);
        }
      } catch (error) {
        console.error('Error loading image:', error);
        if (isMounted) setError(true);
      }
    };

    loadImage();

    return () => {
      isMounted = false;
      clearTimeout(retryTimeoutId);
    };
  }, [src, lowResSrc, webpSrc, isLowBandwidth, isWebPSupported, loadIntersectionObserver, loadProgressively]);

  useEffect(() => {
    let retryTimeoutId;

    if (error && retryCount < retryLimit) {
      retryTimeoutId = setTimeout(() => {
        retryLoading();
      }, retryDelay);
    }

    return () => clearTimeout(retryTimeoutId);
  }, [error, retryCount, retryLimit, retryDelay, retryLoading]);

  if (loading) {
    return (
      <div className="image-loader-container">
        <div className="image-loader-placeholder" aria-busy="true">
          <div className="image-loader-loading-spinner" aria-label="Loading"></div>
        </div>
        {lowResSrc && (
          <img
            src={lowResSrc}
            alt={alt}
            className={`image-loader-img ${className || ''}`}
            style={{
              ...style,
              filter: `blur(${blurAmount}px)`,
            }}
          />
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="image-loader-container">
        <div className="image-loader-error" role="alert">
          Failed to load image
        </div>
      </div>
    );
  }

  return (
    <div className="image-loader-container">
      <img
        ref={imgRef}
        src={imageSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`image-loader-img ${className || ''}`}
        style={{
          ...style,
          filter: `blur(${blurAmount}px)`,
        }}
        onError={() => setError(true)}
      />
    </div>
  );
};

ImageLoader.propTypes = {
  src: PropTypes.string.isRequired,
  lowResSrc: PropTypes.string,
  webpSrc: PropTypes.string,
  jpg: PropTypes.string,
  png: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  sizes: PropTypes.string,
  srcSet: PropTypes.string,
  retryLimit: PropTypes.number,
  retryDelay: PropTypes.number,
  blurUpAmount: PropTypes.number,
};

export default ImageLoader;
