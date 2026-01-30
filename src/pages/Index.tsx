import { useState, useEffect } from "react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PhotographerBio from "@/components/PhotographerBio";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";

const Index = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Homepage always shows SELECTED category
  const activeCategory = "SELECTED";

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMixedMedia(activeCategory, 1, 20);

        // Add local images to the start of the gallery
        const localImages = [
          {
            src: "/1.png",
            highResSrc: "/1.png",
            alt: "First Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            src: "/2.png",
            highResSrc: "/2.png",
            alt: "Second Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            src: "/3.png",
            highResSrc: "/3.png",
            alt: "Third Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            src: "/4.png",
            highResSrc: "/4.png",
            alt: "Fourth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            type: "video" as const,
            src: "/3.png",
            videoSrc: "/video/3.mp4",
            alt: "Fifth Frame Production Video",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Video",
            forceShow: true,
            width: 940,
            height: 627
          },
          {
            src: "/5.png",
            highResSrc: "/5.png",
            alt: "Sixth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 434,
            height: 650
          },
          {
            src: "/6.png",
            highResSrc: "/6.png",
            alt: "Seventh Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 432,
            height: 650
          },
          {
            src: "/7.png",
            highResSrc: "/7.png",
            alt: "Eighth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            type: "video" as const,
            src: "/2.png",
            videoSrc: "/video/2.mp4",
            alt: "Ninth Frame Production Video",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Video",
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            type: "video" as const,
            src: "/9.png",
            videoSrc: "/video/9.mp4",
            alt: "Tenth Frame Production Video",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Video",
            forceShow: true,
            width: 940,
            height: 627
          },
          {
            src: "/9.png",
            highResSrc: "/9.png",
            alt: "Eleventh Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            src: "/10.png",
            highResSrc: "/10.png",
            alt: "Twelfth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            src: "/11.gif",
            highResSrc: "/11.gif",
            alt: "Thirteenth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 434,
            height: 650
          },
          {
            src: "/12.png",
            highResSrc: "/12.png",
            alt: "Fourteenth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 434,
            height: 650
          },
          {
            src: "/24.jpeg",
            highResSrc: "/24.jpeg",
            alt: "Fifteenth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 940,
            height: 627
          },
          {
            type: "video" as const,
            src: "/8.png",
            videoSrc: "/video/8.mp4",
            alt: "Sixteenth Frame Production Video",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Video",
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            src: "/13.png",
            highResSrc: "/13.png",
            alt: "Seventeenth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            type: "video" as const,
            src: "/1.png",
            videoSrc: "/video/1.mp4",
            alt: "Eighteenth Frame Production Video",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Video",
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            src: "/14.png",
            highResSrc: "/14.png",
            alt: "Nineteenth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          },
          {
            src: "/25.jpeg",
            highResSrc: "/25.jpeg",
            alt: "Twentieth Frame Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 940,
            height: 627
          }
        ];

        setDisplayImages(localImages);
      } catch (err) {
        console.error('Error fetching Pexels media:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SIGNAL",
    "description": "AI product photography and creative studio specializing in synthetic product imagery and visual production for modern brands.",
    "url": "https://signal.com",
    "image": "https://signal.com/og-image.jpg",
    "sameAs": [
      "https://instagram.com/signal.photo"
    ],
    "knowsAbout": [
      "AI Product Photography",
      "Synthetic Product Imagery",
      "Creative AI Studio",
      "Visual Production",
      "Commercial Imagery"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "UK"
    }
  };

  return (
    <>
      <SEO
        title="SIGNAL - AI Product Photography & Creative Studio"
        description="AI product photography and creative studio specializing in synthetic product imagery and visual production for modern brands."
        canonicalUrl="/"
        ogType="website"
        jsonLd={jsonLd}
      />

      <PortfolioHeader
        activeCategory={activeCategory}
      />

      <main>
        <PhotographerBio />

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!error && displayImages.length > 0 && (
          <MasonryGallery
            images={displayImages}
            onImageClick={handleImageClick}
            showFrameOnly={true}
            category="selected"
          />
        )}

        {!loading && !error && displayImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No images found in this category.</p>
          </div>
        )}
      </main>

      {lightboxOpen && displayImages.length > 0 && (
        <Lightbox
          images={displayImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PortfolioFooter />
    </>
  );
};

export default Index;
