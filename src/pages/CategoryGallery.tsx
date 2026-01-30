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
        const data = await fetchMixedMedia(categoryUpper, page, 20);

        // For commissioned category, insert local images at specific positions
        if (categoryUpper === 'COMMISSIONED') {
          const localImage13 = {
            src: "/13.png",
            highResSrc: "/13.png",
            alt: "AI Product Photography",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          };
          const localImage14 = {
            src: "/14.png",
            highResSrc: "/14.png",
            alt: "AI Product Photography",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          };
          const localImage15 = {
            src: "/15.png",
            highResSrc: "/15.png",
            alt: "AI Product Photography",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          };
          const localImage16 = {
            src: "/16.webp",
            highResSrc: "/16.webp",
            alt: "AI Product Photography",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          };
          const localImage17 = {
            src: "/17.png",
            highResSrc: "/17.png",
            alt: "AI Product Photography",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          };
          const localImage18 = {
            src: "/18.png",
            highResSrc: "/18.png",
            alt: "AI Product Photography",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          };
          const items = [...data.items];
          items.splice(1, 0, localImage13); // Insert 13.png at index 1 (position 2)
          items.splice(3, 0, localImage14); // Insert 14.png at index 3 (position 4)
          items.splice(7, 0, localImage15); // Insert 15.png at index 7 (position 8)
          items.splice(8, 0, localImage16); // Insert 16.webp at index 8 (position 9)
          items.splice(13, 0, localImage17); // Insert 17.png at index 13 (position 14)
          items.splice(15, 0, localImage18); // Insert 18.png at index 15 (position 16)
          setImages(items);
        } else if (categoryUpper === 'EDITORIAL') {
          // For editorial category, insert local images at specific positions
          const localImage19 = {
            src: "/19.png",
            highResSrc: "/19.png",
            alt: "AI Product Photography",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 434,
            height: 650
          };
          const localImage20 = {
            src: "/20.png",
            highResSrc: "/20.png",
            alt: "AI Product Photography",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 434,
            height: 650
          };
          const localImage27 = {
            src: "/27.jpeg",
            highResSrc: "/27.jpeg",
            alt: "AI Product Photography",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Photography",
            type: "image" as const,
            forceShow: true,
            width: 433,
            height: 650
          };
          const localVideo5 = {
            type: "video" as const,
            src: "/5.png",
            videoSrc: "/video/5.mp4",
            alt: "AI Product Video",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Video",
            forceShow: true,
            width: 433,
            height: 650
          };
          const localVideo6 = {
            type: "video" as const,
            src: "/6.png",
            videoSrc: "/video/6.mp4",
            alt: "AI Product Video",
            photographer: "SIGNAL",
            client: "STUDIO",
            location: "London",
            details: "AI Product Video",
            forceShow: true,
            width: 433,
            height: 650
          };
          const items = [...data.items];
          items.splice(0, 0, localImage19); // Insert 19.png at index 0 (position 1)
          items.splice(2, 0, localImage20); // Insert 20.png at index 2 (position 3)
          items.splice(3, 0, localImage27); // Insert 27.jpeg at index 3 (position 4)
          items.splice(6, 0, localVideo5); // Insert 5.mp4 at index 6 (position 7)
          items.splice(8, 0, localVideo6); // Insert 6.mp4 at index 8 (position 9)
          setImages(items);
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
