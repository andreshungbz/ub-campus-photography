// API Endpoint for Retrieving Random Photo

import Photo from '@models/photo';
import { connectMongoDB } from '@utils/database';

export const GET = async () => {
  try {
    await connectMongoDB();
    // get number of photos in database
    const numPhotos = await Photo.estimatedDocumentCount();
    // get a random number
    const random = Math.floor(Math.random() * numPhotos);
    const photo = await Photo.findOne().skip(random).populate('uploader');
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

// use segment-level caching to ensure data is revalidated on every fetch
// https://nextjs.org/docs/app/building-your-application/data-fetching/caching#segment-level-caching
export const revalidate = 0;
