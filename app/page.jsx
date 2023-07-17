// Home Page

import Gallery from '@components/Gallery';

export default function Home({ searchParams }) {
  const error = searchParams?.error;
  return (
    <div>
      {error === 'AccessDenied' && (
        <div className="error-alert">
          You must sign in with a @ub.edu.bz email address.
        </div>
      )}
      <Gallery />
    </div>
  );
}
