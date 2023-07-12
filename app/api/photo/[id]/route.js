// Route Handler and Deleting a Photo from Database

// next-auth route handler session code adapted from https://dev.to/alishirani/step-by-step-tutorial-on-how-to-use-next-auth-in-nextjs-13-using-route-handlers-2jmc

import { OPTIONS } from 'app/api/auth/[...nextauth]/route.js';
import { getServerSession } from 'next-auth/next';
// experimental: https://next-auth.js.org/configuration/nextjs#getServerSession

import Photo from '@models/photo';
import { connectMongoDB } from '@utils/database';

export const DELETE = async (request, { params }) => {
  try {
    // check session to verify requests
    const session = await getServerSession(OPTIONS);
    if (!session) {
      return new Response('Unauthorized Request', { status: 403 });
    }

    // delete from MongoDB Atlas database and Imgur album
    await connectMongoDB();
    const photo = await Photo.findById(params.id).populate('uploader');
    const photoId = photo._id;
    // ensure session email and photo uploader email match
    if (session?.user?.email === photo?.uploader?.email) {
      const hash = photo.hash;
      await Photo.findByIdAndRemove(params.id);
      await fetch(`https://api.imgur.com/3/image/${hash}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.IMGUR_ACCESS_TOKEN}`,
        },
      });

      // overall feedback log
      console.log(
        `[UB Campus Photography] Photo ${photoId} deleted by user ${session?.user?.email}`
      );

      return new Response('Photo Deleted', { status: 200 });
    } else {
      return new Response('Unauthorized User', { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return new Response('Failed to Delete Photo', { status: 500 });
  }
};
