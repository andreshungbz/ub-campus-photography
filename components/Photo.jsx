// Photo Component for Displaying Single Photo and its Details

'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import moment from 'moment';

const Photo = ({ id }) => {
  // retrieve user
  const { data: session } = useSession();

  // navigation router
  const router = useRouter();

  // state for retrieving photo
  const [photo, setPhoto] = useState(null);
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
        photo && (
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
            {session?.user.id &&
              photo?.uploader?._id &&
              session?.user?.id === photo?.uploader?._id && (
                <div className="mt-2 text-center">
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        )
      )}
    </section>
  );
};
export default Photo;
