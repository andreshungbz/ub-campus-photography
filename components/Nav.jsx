'use client';

import Link from 'next/link';

const Nav = () => {
  const isLoggedIn = false;
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
          <div className="nav-section">
            <Link href="/upload" className="primary-btn">
              Upload
            </Link>
            <Link href="/profile" className="primary-btn">
              Username
            </Link>
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
