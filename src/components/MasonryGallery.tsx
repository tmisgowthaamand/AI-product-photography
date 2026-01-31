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
    const displayIndex = index + 1;
    const isLandscape = [5, 10, 15, 20].includes(displayIndex);

    if (isLandscape) {
      return { width: 940, height: 627 }; // 3:2 ratio
    }
    return { width: 433, height: 650 }; // 2:3 ratio
  };

  return (
    <div className="max-w-[1600px] mx-auto md:px-5 pb-16">
      <div className="gallery-hover-container text-center">
        {images.map((image, index) => {
          const frameDimensions = getFrameDimensions(index);
          const isHovered = hoveredIndex === index;

          // Common frame style for the matted look
          const frameInnerStyle = {
            width: `${(frameDimensions.width / frameDimensions.height) * rowHeight}px`,
            maxWidth: '100%',
          };

          return (
            <button
              key={index}
              onClick={() => onImageClick(index)}
              onMouseEnter={() => handleImageHover(index)}
              onMouseLeave={handleImageLeave}
              className={`relative align-top p-2 transition-all duration-500 ease-out ${image.forceShow ? "cursor-zoom-in" : "cursor-default"
                }`}
              style={{ height: `${rowHeight}px` }}
            >
              <div
                className="relative h-full overflow-hidden bg-[#F9F9FB] border border-black/5 flex flex-col items-center justify-center p-[10px] transition-all duration-500"
                style={frameInnerStyle}
              >
                {/* Populate Content Area */}
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] border border-black/[0.02]">
                  {image.forceShow ? (
                    <>
                      {image.type === "video" ? (
                        <video
                          poster={image.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          onLoadedData={() => handleImageLoad(index)}
                          className={`h-full w-full object-cover transition-all duration-700 ${hoveredIndex !== null && hoveredIndex !== index ? "grayscale opacity-80" : "scale-[1.02]"
                            }`}
                          style={{
                            opacity: loadedImages.has(index) ? 1 : 0,
                          }}
                        >
                          <source src={image.videoSrc} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={image.src}
                          alt={image.alt}
                          onLoad={() => handleImageLoad(index)}
                          className={`h-full w-full object-cover transition-all duration-700 ${hoveredIndex !== null && hoveredIndex !== index ? "grayscale opacity-80" : "scale-[1.02]"
                            }`}
                          style={{
                            opacity: loadedImages.has(index) ? 1 : 0,
                          }}
                          loading="lazy"
                        />
                      )}

                      {/* Gradient Overlay for Metadata readability if needed */}
                      <div className={`absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : ''}`} />
                    </>
                  ) : (
                    /* Empty Frame Style */
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#F2F2F4]/50">
                      {/* Technical Corner Accents inside the mat */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-black/10" />
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-black/10" />

                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[8px] uppercase tracking-[0.4em] font-medium text-black/25">
                          COMING SOON
                        </span>
                        <span className="text-[10px] font-playfair uppercase tracking-[0.15em] text-black/30 italic">
                          I'M IN EDITING TABLE
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gallery Label Tag (Technical/Minimalist) */}
                <div className="mt-2 w-full flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[7px] uppercase tracking-[2px] font-bold text-black/30">
                      SIGNAL STUDIO
                    </span>
                    <div className="h-[1px] w-6 bg-black/5" />
                    <span className="text-[7px] uppercase tracking-[2px] font-bold text-black/30">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>

                  {image.forceShow && (
                    <div className="mt-1 flex flex-col items-center transition-all duration-500">
                      <span className={`text-[9px] font-medium uppercase tracking-[0.05em] transition-colors duration-500 ${isHovered ? 'text-black/80' : 'text-black/50'}`}>
                        {image.client}
                      </span>
                      <span className={`text-[8px] italic font-playfair transition-all duration-500 ${isHovered ? 'text-black/60 opacity-100 translate-y-0' : 'text-black/30 opacity-80'}`}>
                        {image.details}
                      </span>
                    </div>
                  )}
                </div>

                {/* Corner Accents on the outer frame */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/5" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/5" />

                {/* Hover Lift Shadow */}
                {isHovered && (
                  <motion.div
                    layoutId="hover-shadow"
                    className="absolute inset-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
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
