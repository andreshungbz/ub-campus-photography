// Photo Gallery Component

'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Gallery = ({ userId = null }) => {
  // state for populating photos
  const [photos, setPhotos] = useState([]);
  // state for finished fetch
  const [isFetched, setIsFetched] = useState(false);

  // fix: call useSession so that the User schema model is created first before fetching photos
  // on first visit, fetch can be called before session, causing a MissingSchemaError from MongoDB
  const { data: session } = useSession();
  console.log(`Session: ${session?.user?.name}`);

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
        setIsFetched(true);
      }
    };
    fetchPhotos();
    return () => {
      ignore = true;
    };
  }, [userId]);

  // show message for profile pages when there are no photos
  if (userId && photos.length === 0 && isFetched) {
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
