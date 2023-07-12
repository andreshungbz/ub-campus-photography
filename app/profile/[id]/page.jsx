// Profile Page

import Gallery from '@components/Gallery';

import User from '@models/user';
import { connectMongoDB } from '@utils/database';

export const generateMetadata = async ({ params }) => {
  await connectMongoDB();
  const nameQuery = await User.findById(params.id).select('name -_id');
  const name = nameQuery.name;
  return {
    title: `${name}'s Profile`,
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
