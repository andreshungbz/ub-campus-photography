// Photo Gallery Component

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
  }, []);

  // show message for profile pages when there are no photos
  if (userId && photos.length === 0) {
    return <p className="text-center">No photos yet!</p>;
  }

  return (
    <section className="gallery">
      {photos.map((photo) => {
        return (
          <div key={photo._id} className="image-container">
            <Link href={`/photo/${photo._id}`}>
              <Image
                src={photo.link}
                alt={photo.title}
                fill={true}
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </Link>
          </div>
        );
      })}
    </section>
  );
};
export default Gallery;
