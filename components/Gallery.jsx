// Photo Gallery Component

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Gallery = () => {
  // state for populating photos
  const [photos, setPhotos] = useState([]);

  // effect for fetching all photos
  useEffect(() => {
    let ignore = false;
    const fetchPhotos = async () => {
      const response = await fetch('/api/photo');
      const data = await response.json();
      if (!ignore) {
        setPhotos(data);
      }
    };
    fetchPhotos();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="gallery">
      {photos.map((photo) => {
        return (
          <div key={photo._id} className="image-container">
            <Link href="/about">
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
