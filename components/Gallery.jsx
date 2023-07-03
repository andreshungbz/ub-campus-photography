// Photo Gallery Component

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Gallery = ({ userId = null }) => {
  // state for populating photos
  const [photos, setPhotos] = useState([]);

  // effect for fetching all photos
  useEffect(() => {
    let ignore = false;
    const fetchPhotos = async () => {
      const response = await fetch('/api/photo');
      let data = await response.json();
      // for profile pages, filter results
      if (!ignore) {
        if (userId) {
          data = data.filter((photo) => userId === photo?.uploader?._id);
        }
        setPhotos(data);
      }
    };
    fetchPhotos();
    return () => {
      ignore = true;
    };
  }, [userId]);

  // show message for profile pages when there are no photos
  if (userId && photos.length === 0) {
    return <p className="text-center">No photos yet!</p>;
  }

  return (
    <section className="gallery">
      {photos.map((photo) => {
        return (
          <Link key={photo._id} href={`/photo/${photo._id}`}>
            <div className="image-container">
              <Image
                src={photo.link}
                alt={photo.title}
                fill={true}
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Link>
        );
      })}
    </section>
  );
};
export default Gallery;
