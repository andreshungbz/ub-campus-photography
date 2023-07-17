// About Page

import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About',
  author: 'Andres Hung',
  keywords: ['University of Belize', 'Photography', 'Photo'],
  applicationName: 'UB Campus Photography',
};

const About = () => {
  return (
    <div>
      <h1 className="title">About UB Campus Photography</h1>
      <Image
        src="/assets/images/packetroo.jpg"
        width={220}
        height={220}
        alt="Drawing of a cartoon kangaroo with glasses and an office shirt"
        className="portrait"
      />
      <p>
        UB Campus Photography is a website where students of the{' '}
        <Link href="https://www.ub.edu.bz/" className="inline-link">
          University&nbsp;of&nbsp;Belize
        </Link>{' '}
        can upload photographs showcasing the campus and activities therein. To
        upload a photo, sign in with a Google account and visit the upload page
        under the account dropdown. You can also view all of the photos you and
        others have uploaded under the respective profile pages. Authors of
        photographs retain all copyright or their works.
      </p>
      <p>
        This project was done by Andres Hung as a final project for
        Harvard&apos;s 2023{' '}
        <Link href="https://cs50.harvard.edu/x/2023/" className="inline-link">
          CS50x
        </Link>{' '}
        Introduction to Computer Science online course. Source code and
        additional information available in the{' '}
        <Link
          href="https://github.com/andreshungbz/ub-campus-photography"
          className="inline-link"
        >
          GitHub&nbsp;repository
        </Link>
        .
      </p>
      <p>
        API Endpoints are available for fetching a specific photo or a random
        photo. Send an HTTP GET request to the following endpoints. Returned is
        a response with JSON.
      </p>
      <table className="my-3 table">
        <thead>
          <tr>
            <th className="cell w-1/4">Specific Photo</th>
            <td className="cell">
              <code>
                <Link href="https://ub-campus-photography.vercel.app/api/photo/64a31613b99255ec85215a98">
                  /api/photo/[id]
                </Link>
              </code>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="cell w-1/4">Random Photo</th>
            <td className="cell">
              <code>
                <Link href="https://ub-campus-photography.vercel.app/api/photo/random">
                  /api/photo/random
                </Link>
              </code>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mt-5 text-center text-sm">
        Site logo and graphics drawn by Andres Hung
      </p>
    </div>
  );
};
export default About;
