// Route Handler for Retrieving One Photo from Database

import { connectMongoDB } from '@utils/database';
import Photo from '@models/photo';

export const GET = async (req, { params }) => {
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
