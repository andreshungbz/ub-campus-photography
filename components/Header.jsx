// Header Component

import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="header">
      {/* header image */}
      <Link href="/">
        <Image
          src="/assets/images/site-logo.png"
          width={600}
          height={200}
          alt="University of Belize Campus Photography Logo"
          priority={true}
          className="mx-auto mb-3"
        />
      </Link>
      {/* navigation bar */}
      <Nav />
    </header>
  );
};
export default Header;
