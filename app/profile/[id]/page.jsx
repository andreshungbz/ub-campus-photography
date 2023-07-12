// Profile Page

import Gallery from '@components/Gallery';

import Photo from '@models/photo';
import User from '@models/user';
import { connectMongoDB } from '@utils/database';

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

const ProfilePage = async ({ params }) => {
  let user;
  try {
    connectMongoDB();
    user = await User.findById(params.id);
  } catch (error) {
    console.log(error);
    return <div className="text-center">Profile Not Found</div>;
  }
  return (
    <>
      <div className="mb-5">
        <h1 className="title">{user && `${user?.name}'s `}Profile</h1>
      </div>
      <div>
        <Gallery userId={user?._id} />
      </div>
    </>
  );
};
export default ProfilePage;
