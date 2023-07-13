// Profile Page

import Gallery from '@components/Gallery';
import { notFound } from 'next/navigation';

import User from '@models/user';
import { connectMongoDB } from '@utils/database';

// dynamically set title metadata
export const generateMetadata = async ({ params }) => {
  try {
    await connectMongoDB();
    const nameQuery = await User.findById(params.id).select('name -_id');
    const name = nameQuery.name;
    return {
      title: `${name}'s Profile`,
    };
  } catch (error) {
    return;
  }
};

const ProfilePage = async ({ params }) => {
  // obtain user from database
  let user;
  try {
    connectMongoDB();
    user = await User.findById(params.id);
  } catch (error) {
    // redirect to 404 page if mongoose error
    notFound();
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
