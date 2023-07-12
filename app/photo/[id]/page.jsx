// Specific Photo Page

import Delete from '@components/Delete';
import Image from 'next/image';
import Link from 'next/link';

import Photo from '@models/photo';
import { connectMongoDB } from '@utils/database';

import moment from 'moment';

export const generateMetadata = async ({ params }) => {
  const id = params.id;
  // server-side fetching is possible, but needs a direct URL e.g. http://localhost:3000
  // therefore i'm opting for just using id for simple deployment management on Vercel
  // https://stackoverflow.com/a/76311855
  // https://github.com/vercel/next.js/issues/48344

  // const response = await fetch(`${process.env.URL}/api/photo/${id}`);
  // const photo = await response.json();

  return {
    title: `Photo ${id}`, // photo.title
  };
};

const PhotoDisplay = async ({ params }) => {
  let photo;
  try {
    await connectMongoDB();
    photo = await Photo.findById(params.id).populate('uploader');
  } catch (error) {
    console.log(error);
    return <div className="text-center">Image Not Found</div>;
  }

  return (
    photo && (
      <section>
        <div>
          <Image
            src={photo?.link}
            alt={photo?.title}
            width={0}
            height={0}
            sizes="100vw"
            className="mx-auto h-auto w-min"
          />
          <div className="description-box">
            <h1 className="title">{photo?.title}</h1>
            <p className="text-sm">
              <span className="bg-ub-purple-200 px-2 font-jetbrains">
                Uploaded {moment(photo?.uploadDate).format('D MMMM YYYY')}
              </span>
            </p>
            <Link
              href={`/profile/${photo?.uploader?._id}`}
              className="inline-link"
            >
              {photo?.uploader?.name}
            </Link>
            {photo?.cameraModel !== 'Unknown' && (
              <p>{`Camera: ${photo?.cameraModel}`}</p>
            )}
            <p className="text-base">{photo?.description}</p>
          </div>
          <Delete photoData={JSON.stringify(photo)} />
        </div>
      </section>
    )
  );
};
export default PhotoDisplay;
