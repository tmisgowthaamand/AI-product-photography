import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PhotographerBio from "@/components/PhotographerBio";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";

const validCategories = ['selected', 'commissioned', 'editorial', 'personal', 'all'];

const CategoryGallery = () => {
  const { category } = useParams<{ category: string }>();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [page, setPage] = useState(1);

  // Validate category
  if (!category || !validCategories.includes(category.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  // Redirect 'selected' category to homepage since it's the home view
  if (category.toLowerCase() === 'selected') {
    return <Navigate to="/" replace />;
  }

  const categoryUpper = category.toUpperCase();

  useEffect(() => {
    const loadImages = () => {
      setLoading(true);
      setError(null);

      let items: any[] = [];

      if (categoryUpper === 'COMMISSIONED') {
        const commissionedAssetMap: Record<number, any> = {
          1: { src: "/productions/16.webp", details: "ACCESSORIES DETAIL", client: "FASHION HOUSE" },
          2: { src: "/productions/17.png", details: "INTERIOR CONCEPT", client: "MODERN LIVING" },
          3: { src: "/productions/18.png", details: "MINIMALIST STUDY", client: "STUDIO A" },
          4: { type: "video", src: "/productions/19.png", videoSrc: "/video/4.mp4", details: "ATMOSPHERIC MOTION", client: "DIGITAL JOURNAL" },
          5: { src: "/productions/34.jpeg", details: "GALLERY VISIONS STUDY", client: "CURATED SERIES" },
          6: { src: "/productions/19.png", details: "STYLE NARRATIVE", client: "HARPER'S BAZAAR" },
          7: { src: "/productions/20.png", details: "HAUTE COUTURE STORY", client: "VOGUE FEATURE" },
          8: { type: "video", src: "/productions/26.jpeg", videoSrc: "/video/5.mp4", details: "PORTRAIT MOTION", client: "CREATIVE FLOW" },
          9: { src: "/productions/26.jpeg", details: "CLASSICAL PORTRAITURE", client: "PORTRAIT MASTER" },
          10: { src: "/productions/35.jpeg", details: "URBAN TEXTURE STUDY", client: "INDUSTRIAL SUITE" },
          11: { src: "/productions/27.jpeg", details: "CINEMATIC MOOD", client: "DIGITAL JOURNAL" },
          12: { src: "/productions/28.jpeg", details: "COMPLEXION NARRATIVE", client: "BEAUTY MONTHLY" },
          13: { src: "/productions/29.jpeg", details: "FAST FASHION STORY", client: "URBAN PULSE" },
          14: { src: "/productions/30.jpeg", details: "STRUCTURAL FLOW", client: "ARCHITECTURE TODAY" },
          15: { src: "/productions/38.jpeg", details: "GEOMETRICAL STUDY", client: "ABSTRACT SERIES" },
          16: { src: "/productions/32.jpeg", details: "CULINARY ART", client: "CULINARY REVIEW" },
          17: { src: "/productions/31.jpeg", details: "LUXURY LIVING", client: "LIFESTYLE CO" },
          18: { src: "/productions/33.jpeg", details: "ALPS LANDSCAPE STUDY", client: "TRAVELER MEMOIRS" },
          19: { type: "video", src: "/productions/33.jpeg", videoSrc: "/video/6.mp4", details: "Frozen Landscapes Study", client: "Traveler Memoirs" },
          20: { type: "video", src: "/productions/35.jpeg", videoSrc: "/video/13.mp4", details: "Frozen Landscapes Study", client: "Traveler Memoirs" }
        };

        const localAssets = Array.from({ length: 20 }, (_, i) => {
          const pos = i + 1;
          const isLandscape = [5, 10, 15, 20].includes(pos);
          const mappedAsset = commissionedAssetMap[pos];

          return {
            pos,
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

        items = localAssets.map(asset => ({
          src: asset.src,
          highResSrc: asset.src,
          videoSrc: asset.videoSrc,
          alt: asset.alt,
          photographer: asset.photographer,
          client: asset.client,
          location: asset.location,
          details: asset.details,
          type: asset.type,
          forceShow: asset.forceShow,
          width: asset.width,
          height: asset.height
        }));
      } else if (categoryUpper === 'EDITORIAL') {
        const editorialAssetMap: Record<number, any> = {
          1: { src: "/productions/36.jpeg", details: "Post-Modern Motion Study", client: "Creative Flow" },
          2: { src: "/productions/37.jpeg", details: "Tradition Reimagined", client: "Culture Weekly" },
          3: { src: "/productions/39.jpeg", details: "Next-Gen Concept", client: "Futuristic Design" },
          4: { type: "video", src: "/productions/36.jpeg", videoSrc: "/video/7.mp4", details: "Curated Visions Motion", client: "Gallery Series" },
          5: { type: "video", src: "/productions/19.png", videoSrc: "/video/17.mp4", details: "Cinematic Mood Study", client: "Motion Lab" },
          6: { type: "video", src: "/productions/1.png", videoSrc: "/video/8.mp4", details: "Studio Burger Lighting", client: "Gourmet Grill" },
          7: { type: "video", src: "/productions/31.jpeg", videoSrc: "/video/10.mp4", details: "Lifestyle Co Narrative", client: "Lifestyle Co" },
          8: { type: "video", src: "/productions/11.gif", videoSrc: "/video/11.mp4", details: "Majestic Alpha Study", client: "Wildlife Media" },
          9: { type: "video", src: "/productions/32.jpeg", videoSrc: "/video/12.mp4", details: "Molecular Gastronomy", client: "Culinary Review" },
          10: { src: "/productions/51.jpeg", details: "Velvet Chocolate Series", client: "Gourmet Desserts" },
          11: { src: "/productions/20250507_1545_Luxury Editorial Model_simple_compose_01jtn3tg80emntnnqj50d9gy16.png", details: "Luxury Editorial Model", client: "Fashion House" },
          12: { src: "/productions/40.jpeg", details: "Geometrical Narrative", client: "Abstract Form" },
          13: { src: "/productions/41.jpeg", details: "Botanical Study", client: "Glass House" },
          14: { src: "/productions/42.jpeg", details: "Shadow Play", client: "Dark Room" },
          15: { src: "/productions/52.jpeg", details: "Fudge Brownie Macro", client: "Artisan Bakery" },
          16: { src: "/productions/43.jpeg", details: "Industrial Site", client: "Urban Texture" },
          17: { src: "/productions/44.jpeg", details: "Next-Gen Editorial", client: "Futuristic Design" },
          18: { src: "/productions/45.jpeg", details: "Minimalist Aesthetic", client: "Studio Project" },
          19: { src: "/productions/46.jpeg", details: "Creative Study", client: "Creative Suite" },
          20: { src: "/productions/53.jpeg", details: "Cédre Royal Showcase", client: "Univerdesparfums" }
        };

        const localAssets = Array.from({ length: 20 }, (_, i) => {
          const pos = i + 1;
          const isLandscape = [5, 10, 15, 20].includes(pos);
          const mappedAsset = editorialAssetMap[pos];

          return {
            pos,
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

        items = localAssets.map(asset => ({
          src: asset.src,
          highResSrc: asset.src,
          videoSrc: asset.videoSrc,
          alt: asset.alt,
          photographer: asset.photographer,
          client: asset.client,
          location: asset.location,
          details: asset.details,
          type: asset.type,
          forceShow: asset.forceShow,
          width: asset.width,
          height: asset.height
        }));
      } else if (categoryUpper === 'PERSONAL') {
        const personalAssetMap: Record<number, any> = {
          1: { src: "/productions/47.jpeg", details: "Visions of Noir", client: "PERSONAL" },
          2: { src: "/productions/48.jpeg", details: "Texture Exploration", client: "PERSONAL" },
          3: { src: "/productions/49.jpeg", details: "Awareness Narrative", client: "PERSONAL" },
          4: { src: "/productions/50.jpeg", details: "Ganache Study", client: "PERSONAL" },
          5: { src: "/productions/54.jpeg", details: "Device Showcase", client: "PERSONAL" },
          6: { src: "/productions/55.jpeg", details: "Shadow Study", client: "PERSONAL" },
          7: { type: "video", src: "/productions/47.jpeg", videoSrc: "/video/15.mp4", details: "Light Motion Study", client: "PERSONAL" },
          8: { type: "video", src: "/productions/48.jpeg", videoSrc: "/video/16.mp4", details: "Material Flow Study", client: "PERSONAL" },
          9: { type: "video", src: "/productions/49.jpeg", videoSrc: "/video/19.mp4", details: "Atmospheric Pulse", client: "PERSONAL" },
          11: { type: "video", src: "/productions/50.jpeg", videoSrc: "/video/20.mp4", details: "Form exploration", client: "PERSONAL" },
          12: { type: "video", src: "/productions/55.jpeg", videoSrc: "/video/18.mp4", details: "Post-Modern Motion", client: "PERSONAL" }
        };

        const localAssets = Array.from({ length: 20 }, (_, i) => {
          const pos = i + 1;
          const isLandscape = [5, 10, 15, 20].includes(pos);
          const mappedAsset = personalAssetMap[pos];

          return {
            pos,
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

        items = localAssets.map(asset => ({
          src: asset.src,
          highResSrc: asset.src,
          videoSrc: asset.videoSrc,
          alt: asset.alt,
          photographer: asset.photographer,
          client: asset.client,
          location: asset.location,
          details: asset.details,
          type: asset.type,
          forceShow: asset.forceShow,
          width: asset.width,
          height: asset.height
        }));
      }

      setImages(items as any[]);
      setLoading(false);
    };

    loadImages();
  }, [categoryUpper, page]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      'selected': 'Selected Productions',
      'commissioned': 'Commercial Productions',
      'editorial': 'Creative Productions',
      'personal': 'Studio Experiments',
      'all': 'All Productions'
    };
    return titles[cat] || 'Gallery';
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      'selected': 'Curated selection of AI product photography and synthetic imagery showcasing controlled environments and precise visual production.',
      'commissioned': 'Commercial AI product photography for modern brands, featuring synthetic product imagery with clean aesthetics and professional execution.',
      'editorial': 'Creative AI productions for leading publications, combining artistic vision with commercial excellence in synthetic imagery.',
      'personal': 'Studio experiments exploring AI product photography, controlled environments, and creative visual production techniques.',
      'all': 'Complete portfolio of AI product photography and creative productions spanning commercial work and studio experiments.'
    };
    return descriptions[cat] || 'Explore the collection';
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${getCategoryTitle(category)} - SIGNAL`,
    "description": getCategoryDescription(category),
    "url": `https://signal.com/category/${category}`,
    "creator": {
      "@type": "Organization",
      "name": "SIGNAL"
    }
  };

  return (
    <>
      <SEO
        title={`${getCategoryTitle(category)} - SIGNAL`}
        description={getCategoryDescription(category)}
        canonicalUrl={`/category/${category}`}
        jsonLd={jsonLd}
      />

      <PortfolioHeader
        activeCategory={categoryUpper}
      />

      <main>
        <PhotographerBio />

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!error && images.length > 0 && (
          <MasonryGallery
            images={images}
            onImageClick={handleImageClick}
            showFrameOnly={category === 'selected' || category === 'commissioned' || category === 'editorial' || category === 'personal'}
            category={category}
          />
        )}

        {!loading && !error && images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No images found in this category.</p>
          </div>
        )}
      </main>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PortfolioFooter />
    </>
  );
};

export default CategoryGallery;
