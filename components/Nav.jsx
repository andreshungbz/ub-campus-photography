// Navigation Bar Component

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  // navigation router
  const router = useRouter();

  // retrieve session from next-auth, which determines whether a user is logged in or not
  const { data: session } = useSession();

  // state for next-auth authentication providers
  const [providers, setProviders] = useState(null);
  // state for showing and hiding the dropdown menu for logged in users
  const [dropdown, setDropdown] = useState(false);

  // effect for asynchronously retrieving next-auth authentication providers from /api/auth/[...nextauth]
  // https://next-auth.js.org/getting-started/client#getproviders
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  // effect for hiding the dropdown when anywhere is clicked
  useEffect(() => {
    const hideDropdown = () => {
      if (dropdown) {
        setDropdown(false);
      }
    };
    window.addEventListener('click', hideDropdown);
    return () => window.removeEventListener('click', hideDropdown);
  }, [dropdown]);

  // function for retrieving random photo id
  const fetchRandomPhotoId = async () => {
    const response = await fetch('/api/photo/random');
    const data = await response.json();
    const photoId = data._id;
    router.push(`/photo/${photoId}`);
  };

  return (
    <nav className="flex flex-col justify-around gap-2 sm:flex-row">
      {/* common section */}
      <div className="nav-section">
        <Link href="/" className="secondary-btn">
          Home
        </Link>
        <button
          type="button"
          className="secondary-btn"
          onClick={fetchRandomPhotoId}
        >
          Random
        </button>
        <Link href="/about" className="secondary-btn">
          About
        </Link>
      </div>
      {/* dynamic user section */}
      <div>
        {/* if a user is logged in */}
        {/* every button and link here stops event propagation to prevent trigger of window event listener for hiding dropdown */}
        {session?.user ? (
          <div className="nav-section relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdown((prev) => !prev);
              }}
              className="primary-btn"
            >
              {session?.user.email}
            </button>
            {/* dropdown overlay with additional links */}
            {dropdown && (
              <div className="dropdown">
                <Link
                  href={`/profile/${session?.user.id}`}
                  className="dropdown-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdown(false);
                  }}
                >
                  Profile
                </Link>
                <Link
                  href="/upload"
                  className="dropdown-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdown(false);
                  }}
                >
                  Upload
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdown(false);
                    signOut();
                  }}
                  className="dropdown-link"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav-section">
            {/* when a user is not logged in */}
            {/* sign in button for Google authentication */}
            {providers && (
              <button
                type="button"
                onClick={() => {
                  signIn(providers.google.id);
                }}
                className="primary-btn"
              >
                Sign in
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
export default Nav;
