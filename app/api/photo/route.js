// Route Handler for Retrieving All Photos from Database

import User from '@models/user';
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

// use segment-level caching to ensure data is revalidated on every fetch
// https://nextjs.org/docs/app/building-your-application/data-fetching/caching#segment-level-caching
export const revalidate = 0;
