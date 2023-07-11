// Route Handler for Retrieving All Photos from Database

import Photo from '@models/photo';
import { connectMongoDB } from '@utils/database';

export const GET = async () => {
  try {
    await connectMongoDB();
    const photos = await Photo.find({})
      .populate('uploader')
      .sort({ uploadDate: 'descending' });
    return new Response(JSON.stringify(photos), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to Fetch Photos', { status: 500 });
  }
};

export const revalidate = 0;
