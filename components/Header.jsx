// Header Component

import Link from 'next/link';
import Image from 'next/image';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="border-b-2 border-ub-yellow p-3">
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
