// Route Handlers for Retrieving and Deleting One Photo from Database

import Photo from '@models/photo';
import { connectMongoDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const photo = await Photo.findById(params.id).populate('uploader');
    return new Response(JSON.stringify(photo), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to Fetch Photo', {
      status: 500,
      statusText: 'Error: Image Does Not Exist.',
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    // delete from MongoDB Atlas database and Imgur album
    await connectMongoDB();
    const userId = await request.text();
    const photo = await Photo.findById(params.id).populate('uploader');
    // verify user is the owner of photo
    console.log({
      userId: userId,
      photoId: photo?.uploader?._id,
      truth: userId === photo?.uploader?._id.toString(),
    });
    if (userId === photo?.uploader?._id.toString()) {
      const hash = photo.hash;
      await Photo.findByIdAndRemove(params.id);
      await fetch(`https://api.imgur.com/3/image/${hash}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.IMGUR_ACCESS_TOKEN}`,
        },
      });
      return new Response('Photo Deleted', { status: 200 });
    } else {
      return new Response('Unauthorized', { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return new Response('Failed to Delete Photo', { status: 500 });
  }
};
