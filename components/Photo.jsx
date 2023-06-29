// Photo Component for Displaying Single Photo and its Details

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import moment from 'moment';

const Photo = ({ id }) => {
  // retrieve user
  const { data: session } = useSession();

  // navigation router
  const router = useRouter();

  // state for retrieving photo
  const [photo, setPhoto] = useState({});
  // state for error messages
  const [errorMessage, setErrorMessage] = useState(null);

  // effect for fetching specific photo
  useEffect(() => {
    let ignore = false;
    const fetchPhoto = async () => {
      const response = await fetch(`/api/photo/${id}`);
      if (!response.ok) {
        setErrorMessage(response.statusText);
      }
      const data = await response.json();
      if (!ignore) {
        setPhoto(data);
      }
    };
    fetchPhoto();
    return () => {
      ignore = true;
    };
  }, [id]);

  // function for deleting photo
  const handleDelete = async () => {
    const confirmation = confirm('Are you sure you want to delete this photo?');
    if (confirmation) {
      try {
        await fetch(`/api/photo/${id}`, { method: 'DELETE' });
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <Image
            src={photo.link}
            alt={photo.title}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
          <div className="mt-2 p-2 text-center text-sm">
            <h1 className="mb-2 text-4xl font-bold">{photo.title}</h1>
            <p className="text-sm">
              {moment(photo.uploadDate).format('DD MMMM YYYY')}
            </p>
            <p>{photo?.uploader?.name}</p>
            <p>{photo?.uploader?.email}</p>
            <p>
              {photo.cameraModel !== 'Unknown' &&
                `Camera: ${photo.cameraModel}`}
            </p>
            <br />
            <p className="text-base">{photo.description}</p>
          </div>
          {session?.user.id === photo?.uploader?._id && (
            <div className="text-center">
              <button
                type="button"
                className="text-red-500"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
export default Photo;
