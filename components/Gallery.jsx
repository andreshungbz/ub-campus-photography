// Photo Gallery Component

import Image from 'next/image';
import Link from 'next/link';

import { revalidate } from '@utils/revalidate';

// define User model to prevent MissingSchemaError on first visit
import User from '@models/user';

import Photo from '@models/photo';
import { connectMongoDB } from '@utils/database';

const Gallery = async ({ userId = null }) => {
  revalidate();

  // obtain photos from database
  let photos;
  try {
    await connectMongoDB();
    // query user's photos if prop was passed in (profile page)
    if (userId) {
      photos = await Photo.find({ uploader: userId }).sort({
        uploadDate: 'descending',
      });
      // query all photos
    } else {
      photos = await Photo.find({}).sort({ uploadDate: 'descending' });
    }
  } catch (error) {
    console.log(error);
  }

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
                sizes="(max-width: 768px) 100vw, 20vw"
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
