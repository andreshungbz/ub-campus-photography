'use client';

import Link from 'next/link';
import { useState } from 'react';

const Nav = () => {
  const isLoggedIn = true;
  const [dropdown, setDropdown] = useState(false);
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
        {isLoggedIn ? (
          <div className="nav-section relative">
            <button
              onClick={() => {
                setDropdown((prev) => !prev);
              }}
              className="primary-btn"
            >
              username
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
            <button href="/" className="primary-btn">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Nav;
