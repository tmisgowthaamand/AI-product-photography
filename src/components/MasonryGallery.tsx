import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

interface GalleryItem {
  type?: "image" | "video";
  src: string;
  videoSrc?: string;
  highResSrc?: string;
  alt: string;
  photographer?: string;
  client?: string;
  location?: string;
  details?: string;
  span?: number;
  width?: number;
  height?: number;
  frameWidth?: number;
  frameHeight?: number;
  forceShow?: boolean;
}

interface MasonryGalleryProps {
  images: GalleryItem[];
  onImageClick: (index: number) => void;
  showFrameOnly?: boolean;
  category?: string;
}

const MasonryGallery = ({ images, onImageClick, showFrameOnly = false, category = '' }: MasonryGalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine row height based on screen size
  const rowHeight = windowWidth < 640 ? 180 : windowWidth < 1024 ? 220 : 270;

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleImageHover = (index: number) => {
    setHoveredIndex(index);

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer to reset after 2800ms
    timerRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 2800);
  };

  const handleImageLeave = () => {
    // Don't reset hoveredIndex on mouse leave, let the timer handle it
  };

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Get frame dimensions based on category and index (1-indexed for user reference)
  const getFrameDimensions = (index: number) => {
    const displayIndex = index + 1; // Convert to 1-indexed

    // Commissioned category dimensions
    if (category === 'commissioned') {
      // 940 × 627 px: 1, 3, 6, 12, 13, 17, 18
      if ([1, 3, 6, 12, 13, 17, 18].includes(displayIndex)) {
        return { width: 940, height: 627 };
      }
      // 433 × 650 px: 2, 4, 5, 8, 14, 16
      if ([2, 4, 5, 8, 14, 16].includes(displayIndex)) {
        return { width: 433, height: 650 };
      }
      // 630 × 1200 px: 10, 11
      if ([10, 11].includes(displayIndex)) {
        return { width: 630, height: 1200 };
      }
      // 366 × 650 px: 7
      if (displayIndex === 7) {
        return { width: 366, height: 650 };
      }
      // 454 × 650 px: 9
      if (displayIndex === 9) {
        return { width: 454, height: 650 };
      }
      // 1200 × 630 px: 15, 20
      if ([15, 20].includes(displayIndex)) {
        return { width: 1200, height: 630 };
      }
      // 867 × 650 px: 19
      if (displayIndex === 19) {
        return { width: 867, height: 650 };
      }
      return { width: 433, height: 650 }; // Default for commissioned
    }

    // Selected category dimensions (homepage)
    if (category === 'selected') {
      // 520 × 650 px: (None - changed to 2:3)
      if ([].includes(displayIndex)) {
        return { width: 520, height: 650 };
      }
      // 433 × 650 px: 1, 2, 3, 4, 8, 9, 11, 12, 16, 17, 18, 19
      if ([1, 2, 3, 4, 8, 9, 11, 12, 16, 17, 18, 19].includes(displayIndex)) {
        return { width: 433, height: 650 };
      }
      // 630 × 1200 px: (None - all changed to 3:2)
      if ([].includes(displayIndex)) {
        return { width: 630, height: 1200 };
      }
      // 940 × 627 px: 5, 10, 15, 20 (Landscape 3:2)
      if ([5, 10, 15, 20].includes(displayIndex)) {
        return { width: 940, height: 627 };
      }
      // 434 × 650 px: 6, 13, 14
      if ([6, 13, 14].includes(displayIndex)) {
        return { width: 434, height: 650 };
      }
      // 432 × 650 px: 7
      if (displayIndex === 7) {
        return { width: 432, height: 650 };
      }
      return { width: 433, height: 650 }; // Default for selected
    }

    // Editorial category dimensions
    if (category === 'editorial') {
      // 434 × 650 px: 1, 3, 4, 7, 9, 12, 14, 16
      if ([1, 3, 4, 7, 9, 12, 14, 16].includes(displayIndex)) {
        return { width: 434, height: 650 };
      }
      // 520 × 650 px: 2, 6, 8, 13, 17
      if ([2, 6, 8, 13, 17].includes(displayIndex)) {
        return { width: 520, height: 650 };
      }
      // 630 × 1200 px: 5
      if (displayIndex === 5) {
        return { width: 630, height: 1200 };
      }
      // 1200 × 630 px: 10, 15, 20
      if ([10, 15, 20].includes(displayIndex)) {
        return { width: 1200, height: 630 };
      }
      // 464 × 650 px: 11
      if (displayIndex === 11) {
        return { width: 464, height: 650 };
      }
      // 433 × 650 px: 18, 19
      if ([18, 19].includes(displayIndex)) {
        return { width: 433, height: 650 };
      }
      return { width: 434, height: 650 }; // Default for editorial
    }

    // Personal category dimensions
    if (category === 'personal') {
      // 940 × 627 px: 1, 3, 7, 12, 14
      if ([1, 3, 7, 12, 14].includes(displayIndex)) {
        return { width: 940, height: 627 };
      }
      // 433 × 650 px: 2, 4, 6, 8, 9, 11, 13, 16, 17, 18, 19
      if ([2, 4, 6, 8, 9, 11, 13, 16, 17, 18, 19].includes(displayIndex)) {
        return { width: 433, height: 650 };
      }
      // 1200 × 630 px: 5
      if (displayIndex === 5) {
        return { width: 1200, height: 630 };
      }
      // 630 × 1200 px: 10, 15, 20
      if ([10, 15, 20].includes(displayIndex)) {
        return { width: 630, height: 1200 };
      }
      return { width: 433, height: 650 }; // Default for personal
    }

    return { width: 433, height: 650 }; // Default
  };

  return (
    <div className="max-w-[1600px] mx-auto md:px-5 pb-16">
      <div className="gallery-hover-container text-center">
        {images.map((image, index) => {
          const frameDimensions = getFrameDimensions(index);

          // If showFrameOnly, render empty frame (unless forceShow is true)
          if (showFrameOnly && !image.forceShow) {
            return (
              <button
                key={index}
                onClick={() => onImageClick(index)}
                onMouseEnter={() => handleImageHover(index)}
                onMouseLeave={handleImageLeave}
                className="relative cursor-pointer gallery-image inline-block align-top p-1"
                style={{ height: `${rowHeight}px` }}
              >
                <div
                  className="relative h-full overflow-hidden transition-all duration-300 hover:border-gray-400 flex flex-col items-center justify-center p-4 text-center group"
                  style={{
                    width: `${(frameDimensions.width / frameDimensions.height) * rowHeight}px`,
                    maxWidth: '100%',
                    border: '1px solid #e5e5e5',
                    backgroundColor: 'transparent'
                  }}
                >
                  <div className="flex flex-col items-center gap-1.5 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-foreground">
                      COMING SOON
                    </span>
                    <span className="text-[10px] font-playfair uppercase tracking-[0.15em] text-foreground/80 italic">
                      I'M IN EDITING TABLE
                    </span>
                  </div>

                  {/* Empty frame - maintains aspect ratio */}
                  <svg
                    width={frameDimensions.width}
                    height={frameDimensions.height}
                    viewBox={`0 0 ${frameDimensions.width} ${frameDimensions.height}`}
                    className="absolute inset-0 h-full w-full pointer-events-none"
                  >
                    <rect
                      width={frameDimensions.width}
                      height={frameDimensions.height}
                      fill="transparent"
                    />
                  </svg>
                </div>
              </button>
            );
          }

          return (
            <button
              key={index}
              onClick={() => onImageClick(index)}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={handleImageLeave}
              className="relative cursor-zoom-in gallery-image inline-block align-top p-1"
              style={{ height: `${rowHeight}px` }}
            >
              <div
                className="relative h-full overflow-hidden"
                style={{
                  width: `${(frameDimensions.width / frameDimensions.height) * rowHeight}px`,
                  maxWidth: '100%'
                }}
              >
                {image.type === "video" ? (
                  // Video element with thumbnail poster
                  <div className="relative h-full w-auto inline-block">
                    {image.width && image.height && (
                      <svg
                        width={image.width}
                        height={image.height}
                        viewBox={`0 0 ${image.width} ${image.height}`}
                        className="h-full w-auto"
                      >
                        <rect
                          width={image.width}
                          height={image.height}
                          fill="white"
                        />
                      </svg>
                    )}
                    <video
                      poster={image.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onLoadedData={() => handleImageLoad(index)}
                      className={`absolute top-0 left-0 h-full w-auto object-contain transition-all duration-400 ${hoveredIndex !== null && hoveredIndex !== index
                        ? "grayscale"
                        : ""
                        }`}
                      style={{
                        opacity: loadedImages.has(index) ? 1 : 0,
                        transition: "opacity 0.5s ease-out",
                      }}
                    >
                      <source src={image.videoSrc} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  // Image element with SVG placeholder
                  <picture
                    className={`inline-block h-full w-auto ${loadedImages.has(index) ? "show" : ""
                      }`}
                  >
                    {image.width && image.height && (
                      <svg
                        width={image.width}
                        height={image.height}
                        viewBox={`0 0 ${image.width} ${image.height}`}
                        className="h-full w-auto"
                      >
                        <rect
                          width={image.width}
                          height={image.height}
                          fill="white"
                        />
                      </svg>
                    )}
                    <img
                      src={image.src}
                      alt={image.alt}
                      onLoad={() => handleImageLoad(index)}
                      className={`absolute top-0 left-0 h-full w-auto object-contain transition-all duration-400 ${hoveredIndex !== null && hoveredIndex !== index
                        ? "grayscale"
                        : ""
                        }`}
                      style={{
                        opacity: loadedImages.has(index) ? 1 : 0,
                        transition: "opacity 0.5s ease-out",
                      }}
                      loading="lazy"
                    />
                  </picture>
                )}
                <ProgressiveBlur
                  className="pointer-events-none absolute bottom-0 left-0 h-[80%] w-full"
                  blurIntensity={0.6}
                  animate={hoveredIndex === index ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
                {image.photographer && image.client && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full pointer-events-none"
                    animate={hoveredIndex === index ? "visible" : "hidden"}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="flex flex-col items-center gap-0 px-4 py-3 text-center">
                      <p className="text-base font-medium text-white">
                        For {image.client}
                      </p>
                      <span className="text-xs text-white/90">
                        Shot in {image.location}. {image.details}.
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MasonryGallery;
