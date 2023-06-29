// Photo Component for Displaying Single Photo and its Details

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import moment from 'moment';

const Photo = ({ id }) => {
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

  useEffect(() => {
    console.log(photo);
  });

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
          <div>
            <h1>{photo.title}</h1>
            <p>
              Upload Date: {moment(photo.uploadDate).format('DD MMMM YYYY')}
            </p>
            <p>Uploader: {photo?.uploader?.name}</p>
            <p>Email: {photo?.uploader?.email}</p>
            <p>{photo.description}</p>
            <p>
              {photo.cameraModel !== 'Unknown' &&
                `Camera: ${photo.cameraModel}`}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
export default Photo;
