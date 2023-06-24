'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  // set dropdown to false when outside the username button is clicked
  useEffect(() => {
    const hideDropdown = () => {
      if (dropdown) {
        setDropdown(false);
      }
    };
    window.addEventListener('click', hideDropdown);
    return () => window.removeEventListener('click', hideDropdown);
  }, [dropdown]);

  return (
    <nav className="flex flex-col justify-around gap-2 sm:flex-row">
      <div className="nav-section">
        <Link href="/" className="secondary-btn">
          Home
        </Link>
        <Link href="/about" className="secondary-btn">
          About
        </Link>
      </div>
      <div>
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
            {dropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
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
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="primary-btn"
                >
                  Sign in
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};
export default Nav;
