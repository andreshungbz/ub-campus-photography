import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex justify-center gap-3 border-t-4 border-ub-yellow px-3 pt-5 text-center">
      <Link
        href="https://github.com/andreshungbz/ub-campus-photography"
        className="inline-link"
      >
        GitHub
      </Link>
    </footer>
  );
};
export default Footer;
