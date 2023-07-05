// Footer Component

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <Link
        href="https://github.com/andreshungbz/ub-campus-photography"
        className="inline-link"
      >
        GitHub
      </Link>
      <a
        href={`mailto:2018118240@ub.edu.bz?subject=Report Photo`}
        className="inline-link"
      >
        Report Photo
      </a>
    </footer>
  );
};
export default Footer;
