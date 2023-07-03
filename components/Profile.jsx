// Profile Component for A User's Gallery

'use client';

import Gallery from '@components/Gallery';
import { useEffect, useState } from 'react';

const Profile = ({ id }) => {
  // state for storing name
  const [user, setUser] = useState(null);
  // state for error messages
  const [errorMessage, setErrorMessage] = useState(null);

  // effect for fetching name
  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      const response = await fetch(`/api/profile/${id}`);
      if (!response.ok) {
        setErrorMessage(response.statusText);
      }
      const data = await response.json();
      if (!ignore) {
        setUser(data);
      }
    };
    fetchUser();
    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <>
      <div className="mb-5">
        <h1 className="title">{user && `${user.name}'s `}Profile</h1>
        <p className="text-center text-sm">{user && user.email}</p>
        <p className="text-center text-red-500">{errorMessage}</p>
      </div>
      <div>
        <Gallery userId={id} />
      </div>
    </>
  );
};
export default Profile;
