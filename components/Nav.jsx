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

  return (
    <nav className="flex flex-col justify-around gap-2 sm:flex-row">
      <div className="nav-section">
        <Link
          href="/"
          onClick={() => setDropdown(false)}
          className="secondary-btn"
        >
          Home
        </Link>
        <Link
          href="/about"
          onClick={() => setDropdown(false)}
          className="secondary-btn"
        >
          About
        </Link>
      </div>
      <div>
        {session?.user ? (
          <div className="nav-section relative">
            <button
              onClick={() => {
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
                  onClick={() => setDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/upload"
                  className="dropdown-link"
                  onClick={() => setDropdown(false)}
                >
                  Upload
                </Link>
                <button
                  type="button"
                  onClick={() => {
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
