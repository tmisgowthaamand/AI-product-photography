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
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        // Stopped fetching Pexels media
        // const data = await fetchMixedMedia(categoryUpper, page, 20);
        const data = { items: [] };

        // For commissioned category, insert local images at specific positions
        if (categoryUpper === 'COMMISSIONED') {
          const commissionedItems = [
            { src: "/productions/24.jpeg", width: 940, height: 627 }, // 1
            { type: "video" as const, src: "/productions/11.gif", videoSrc: "/video/11.mp4", width: 433, height: 650 },  // 2
            { type: "video" as const, src: "/productions/1.png", videoSrc: "/video/1.mp4", width: 940, height: 627 }, // 3
            { src: "/productions/20250507_1545_Luxury Editorial Model_simple_compose_01jtn3tg80emntnnqj50d9gy16.png", width: 433, height: 650 },  // 4
            { src: "/productions/4.png", width: 630, height: 1200 },  // 5
            { src: "/productions/25.jpeg", width: 940, height: 627 }, // 6
            { src: "/productions/7.png", width: 366, height: 650 },   // 7
            { src: "/productions/15.png", width: 433, height: 650 },  // 8
            { src: "/productions/16.webp", width: 454, height: 650 }, // 9
            { type: "video" as const, src: "/productions/2.png", videoSrc: "/video/2.mp4", width: 630, height: 1200 }, // 10
            { src: "/productions/5.png", width: 630, height: 1200 },  // 11
            { src: "/productions/26.jpeg", width: 940, height: 627 }, // 12
            { type: "video" as const, src: "/productions/3.png", videoSrc: "/video/3.mp4", width: 940, height: 627 }, // 13
            { src: "/productions/17.png", width: 433, height: 650 },  // 14
            { src: "/productions/27.jpeg", width: 1200, height: 630 }, // 15
            { src: "/productions/18.png", width: 433, height: 650 },  // 16
            { src: "/productions/28.jpeg", width: 940, height: 627 }, // 17
            { src: "/productions/29.jpeg", width: 940, height: 627 }, // 18
            { src: "/productions/30.jpeg", width: 867, height: 650 }, // 19
            { src: "/productions/31.jpeg", width: 1200, height: 630 } // 20
          ].map((item, index) => ({
            ...item,
            highResSrc: item.src,
            alt: "AI Product Production",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: item.type || ("image" as const),
            forceShow: ![2, 11, 12, 14, 16, 17, 18, 19].includes(index)
          }));

          setImages(commissionedItems as any[]);
        } else if (categoryUpper === 'EDITORIAL') {
          const editorialLocalAssets = [
            { pos: 1, src: "/productions/19.png", width: 434, height: 650 },
            { pos: 3, src: "/productions/20.png", width: 434, height: 650 },
            { pos: 4, src: "/productions/27.jpeg", width: 433, height: 650 },
            { pos: 7, src: "/productions/5.png", videoSrc: "/video/5.mp4", type: "video" as const, width: 433, height: 650 },
            { pos: 9, src: "/productions/6.png", videoSrc: "/video/6.mp4", type: "video" as const, width: 433, height: 650 },
            { pos: 11, src: "/productions/28.jpeg", width: 433, height: 650 },
            { pos: 14, src: "/productions/10.png", videoSrc: "/video/10.mp4", type: "video" as const, width: 433, height: 650 },
            { pos: 16, src: "/productions/11.gif", videoSrc: "/video/11.mp4", type: "video" as const, width: 433, height: 650 },
            { pos: 18, src: "/productions/29.jpeg", width: 433, height: 650 },
            { pos: 19, src: "/productions/30.jpeg", width: 433, height: 650 },
            { pos: 21, src: "/productions/31.jpeg", width: 433, height: 650 },
            { pos: 22, src: "/productions/32.jpeg", width: 433, height: 650 },
            { pos: 23, src: "/productions/33.jpeg", width: 433, height: 650 },
            { pos: 24, src: "/productions/36.jpeg", width: 433, height: 650 },
            { pos: 25, src: "/productions/37.jpeg", width: 433, height: 650 },
            { pos: 26, src: "/productions/39.jpeg", width: 433, height: 650 },
            { pos: 27, src: "/productions/40.jpeg", width: 433, height: 650 },
            { pos: 28, src: "/productions/41.jpeg", width: 433, height: 650 },
            { pos: 29, src: "/productions/42.jpeg", width: 433, height: 650 },
            { pos: 31, src: "/productions/43.jpeg", width: 433, height: 650 },
            { pos: 33, src: "/productions/44.jpeg", width: 433, height: 650 },
            { pos: 35, src: "/productions/45.jpeg", width: 433, height: 650 },
            { pos: 36, src: "/productions/46.jpeg", width: 433, height: 650 },
            { pos: 37, src: "/productions/47.jpeg", width: 433, height: 650 },
          ];

          const items = [...data.items];
          editorialLocalAssets.forEach(asset => {
            const item = {
              src: asset.src,
              highResSrc: asset.src,
              videoSrc: asset.videoSrc,
              alt: "AI Product Photography",
              photographer: "SIGNAL",
              client: "STUDIO",
              location: "London",
              details: asset.videoSrc ? "AI Product Video" : "AI Product Photography",
              type: asset.type || ("image" as const),
              forceShow: true,
              width: asset.width,
              height: asset.height
            };
            items.splice(asset.pos - 1, 0, item);
          });

          setImages(items);
        } else if (categoryUpper === 'PERSONAL') {
          const personalLocalAssets = [
            { pos: 1, type: "video" as const, src: "/productions/13.png", videoSrc: "/video/13.mp4", width: 940, height: 627 },
            { pos: 2, src: "/productions/48.jpeg", width: 433, height: 650 },
            { pos: 3, type: "video" as const, src: "/productions/14.png", videoSrc: "/video/14.mp4", width: 940, height: 627 },
          ];

          // Generate 20 units for the Personal gallery
          const items = Array.from({ length: 20 }, (_, i) => {
            const pos = i + 1;
            const asset = personalLocalAssets.find(a => a.pos === pos);

            // Default dimensions based on category logic
            let width = 433;
            let height = 650;
            if ([1, 3, 7, 12, 14].includes(pos)) { width = 940; height = 627; }
            else if (pos === 5) { width = 1200; height = 630; }
            else if ([10, 15, 20].includes(pos)) { width = 630; height = 1200; }

            return {
              src: asset?.src || "/placeholder.svg",
              highResSrc: asset?.src || "/placeholder.svg",
              videoSrc: asset?.videoSrc,
              alt: "Studio Experiment",
              photographer: "SIGNAL",
              client: "STUDIO",
              location: "London",
              details: asset?.videoSrc ? "AI Product Video" : "AI Production Study",
              type: asset?.type || ("image" as const),
              forceShow: !!asset,
              width: asset?.width || width,
              height: asset?.height || height
            };
          });

          setImages(items as any[]);
        } else {
          setImages(data.items);
        }
      } catch (err) {
        console.error('Error fetching Pexels media:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
      }
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
