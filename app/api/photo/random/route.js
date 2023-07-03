// API Endpoint for Retrieving Random Photo

import { NextResponse } from 'next/server';

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
    return NextResponse.json(photo);
  } catch (error) {
    console.log(error);
    return new Response('Failed to Fetch Photo', {
      status: 500,
      statusText: 'Error: Image Does Not Exist.',
    });
  }
};
