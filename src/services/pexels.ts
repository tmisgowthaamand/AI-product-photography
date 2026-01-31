// This service is currently disabled as requested by the user.
// It previously fetched images and videos from the Pexels API.

export const fetchPexelsPhotos = async () => ({ photos: [], total_results: 0 });
export const fetchPexelsVideos = async () => ({ videos: [], total_results: 0 });
export const fetchMixedMedia = async () => ({ items: [], total_results: 0 });
export const transformPexelsToGalleryImage = () => ({});
