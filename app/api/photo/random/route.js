// API Endpoint for Retrieving Random Photo

import { headers } from 'next/headers';

import Photo from '@models/photo';
import { connectMongoDB } from '@utils/database';

export const GET = async () => {
  const headersList = headers();
  const referer = headersList.get('referer');
  try {
    await connectMongoDB();
    // get number of photos in database
    const numPhotos = await Photo.estimatedDocumentCount();
    // get a random number
    const random = Math.floor(Math.random() * numPhotos);
    const photo = await Photo.findOne().skip(random).populate('uploader');
    return new Response(JSON.stringify(photo), {
      status: 200, // extra headers to make Vercel deployment work
      headers: {
        referer: referer,
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to Fetch Photo', {
      status: 500,
      statusText: 'Error: Image Does Not Exist.',
    });
  }
};
