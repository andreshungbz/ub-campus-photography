// Header Component

import Image from 'next/image';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="border-b-4 border-ub-yellow p-3">
      {/* header image */}
      <Image
        src="/assets/images/placeholder.png"
        width={600}
        height={200}
        alt="University of Belize Campus Photography Logo"
        priority={true}
        className="mx-auto mb-3"
      />
      {/* navigation bar */}
      <Nav />
    </header>
  );
};
export default Header;
