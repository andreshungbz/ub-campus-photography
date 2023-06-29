// Route Handler for Retrieving All Photos from Database

import { headers } from 'next/headers';
import { connectMongoDB } from '@utils/database';
import Photo from '@models/photo';

export const GET = async () => {
  const headersList = headers();
  const referer = headersList.get('referer');
  try {
    await connectMongoDB();
    const photos = await Photo.find({})
      .populate('uploader')
      .sort({ uploadDate: 'descending' });
    return new Response(JSON.stringify(photos), {
      status: 200,
      // extra headers to make Vercel deployment work
      headers: {
        referer: referer,
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to Fetch Photos', { status: 500 });
  }
};
