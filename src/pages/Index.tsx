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
        // Stopped fetching Pexels media
        // const data = await fetchMixedMedia(activeCategory, 1, 20);

        // Add local images to the start of the gallery
        const assetMap: Record<number, any> = {
          1: { src: "/productions/1.png", details: "ARTISAN TAILOR", client: "SIGNAL STUDIO" },
          2: { src: "/productions/2.png", details: "SILK TEXTURE STUDY", client: "HERITAGE SAREE" },
          3: { src: "/productions/3.png", details: "CINEMATIC HOUSE", client: "ARCHITECTURE SERIES" },
          4: { src: "/productions/4.png", details: "SUSTAINABLE FORM", client: "ECO DESIGN" },
          5: { type: "video", src: "/productions/3.png", videoSrc: "/video/3.mp4", details: "DYNAMIC SNACK MOTION", client: "FLAVOR HOUSE" },
          6: { src: "/productions/5.png", details: "WELLNESS SERIES", client: "FEEL NUTRITION" },
          7: { src: "/productions/6.png", details: "HANDMADE COOKIES", client: "BAKED BY HEART" },
          8: { src: "/productions/15.png", details: "ARTISTIC NARRATIVE", client: "CREATE NOT HATE" },
          9: { type: "video", src: "/productions/7.png", videoSrc: "/video/1.mp4", details: "LIQUID MOTION", client: "BEVERAGE CO" },
          10: { type: "video", src: "/productions/9.png", videoSrc: "/video/9.mp4", details: "PRECISION WATCH", client: "LUXURY TIMEPIECE" },
          11: { src: "/productions/8.png", details: "LUXURY MECHANICS", client: "PRECISION WATCH" },
          12: { src: "/productions/9.png", details: "BREAKFAST STUDY", client: "KITCHEN TABLE" },
          13: { src: "/productions/10.png", details: "LEVITATION STUDY", client: "SUSHI ART" },
          14: { src: "/productions/11.gif", details: "SILK TEXTURE STUDY", client: "HERITAGE SAREE" },
          15: { src: "/productions/24.jpeg", details: "RISHIKESH TALES CINEMA", client: "TRAVELERS JOURNAL" },
          16: { src: "/productions/12.png", details: "CONFECTIONARY MACRO", client: "SWEET BOUTIQUE" },
          17: { src: "/productions/13.png", details: "NATURE ELEMENTS", client: "SOLARIS" },
          18: { type: "video", src: "/productions/32.jpeg", videoSrc: "/video/5.mp4", details: "JEWELRY MOTION", client: "FINE JEWELRY" },
          19: { type: "video", src: "/productions/14.png", videoSrc: "/video/2.mp4", details: "FOOD MOTION", client: "CULINARY REVIEW" },
          20: { src: "/productions/25.jpeg", details: "GEMSTONE BEAD BRACELET", client: "ZEN GALLERY" }
        };

        const localImages = Array.from({ length: 20 }, (_, i) => {
          const pos = i + 1;
          const isLandscape = [5, 10, 15, 20].includes(pos);
          const mappedAsset = assetMap[pos];

          return {
            src: mappedAsset?.src || "",
            videoSrc: mappedAsset?.videoSrc,
            alt: mappedAsset?.details || `Frame ${pos}`,
            photographer: "SIGNAL",
            client: mappedAsset?.client || "STUDIO",
            location: "London",
            details: mappedAsset?.details || "AI Production",
            type: (mappedAsset?.type || "image") as "image" | "video",
            forceShow: !!mappedAsset,
            width: isLandscape ? 940 : 433,
            height: isLandscape ? 627 : 650
          };
        });

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
