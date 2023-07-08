// Profile Page

import Profile from '@components/Profile';

export const generateMetadata = async ({ params }) => {
  const id = params.id;
  // server-side fetching is possible, but needs a direct URL e.g. http://localhost:3000
  // therefore i'm opting for just using id for simple deployment management on Vercel
  // https://stackoverflow.com/a/76311855
  // https://github.com/vercel/next.js/issues/48344

  // const response = await fetch(`${process.env.URL}/api/profile/${id}`);
  // const profile = await response.json();

  return {
    title: `Profile ${id}`, // profile.name
  };
};

const ProfilePage = ({ params }) => {
  return (
    <div>
      <Profile id={params.id} />
    </div>
  );
};
export default ProfilePage;
