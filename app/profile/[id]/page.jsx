// Profile Page

'use client';

import { useState, useEffect } from 'react';
import Gallery from '@components/Gallery';

const Profile = ({ params }) => {
  // state for storing name
  const [name, setName] = useState(null);
  // state for error messages
  const [errorMessage, setErrorMessage] = useState(null);

  // effect for fetching name
  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      const response = await fetch(`/api/profile/${params.id}`);
      if (!response.ok) {
        setErrorMessage(response.statusText);
      }
      const data = await response.json();
      const name = data.name;
      if (!ignore) {
        setName(name);
      }
    };
    fetchUser();
    return () => {
      ignore = true;
    };
  }, [params.id]);

  return (
    <>
      <h1 className="title">{name && `${name}'s `}Profile</h1>
      <p className="text-center text-red-500">{errorMessage}</p>
      <div>
        <Gallery userId={params.id} />
      </div>
    </>
  );
};
export default Profile;
