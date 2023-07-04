// Route Handler for Uploading New Photos to Database

// Imgur API documentation: https://apidocs.imgur.com/
// ExifReader documentation: https://github.com/mattiasw/ExifReader

// file retrieval code adapted from https://medium.com/@_hanglucas/file-upload-in-next-js-app-router-13-4-6d24f2e3d00f
// next-auth route handler session code adapted from https://dev.to/alishirani/step-by-step-tutorial-on-how-to-use-next-auth-in-nextjs-13-using-route-handlers-2jmc

import ExifReader from 'exifreader';

import { OPTIONS } from 'app/api/auth/[...nextauth]/route.js';
import { getServerSession } from 'next-auth/next';
// experimental: https://next-auth.js.org/configuration/nextjs#getServerSession

import Photo from '@models/photo';
import { connectMongoDB } from '@utils/database';

export const POST = async (request) => {
  try {
    // check session to verify requests
    const session = await getServerSession(OPTIONS);
    if (!session) {
      return new Response('Unauthorized Request', { status: 403 });
    }

    // retrieve form data
    const formData = await request.formData();

    // server-side file validation
    const file = formData.get('image');
    // ensure file type is png or jpeg
    const validTypes = ['image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      return new Response(null, {
        status: 400,
        statusText: 'Incorrect File Format. Only JPG/JPEG or PNG Accepted.',
      });
    }
    // ensure image size is less than 10 Megabytes (Imgur API image upload file limit)
    if (file.size > 10000000) {
      return new Response(null, {
        status: 400,
        statusText: 'File Size Too Large (Over 10 MB)',
      });
    }

    // populate formData values for Imgur
    formData.append('name', file.name);
    formData.append('album', process.env.IMGUR_ALBUM_HASH);

    // extract exif data from image using ExifReader
    const fileArrayBuffer = await file.arrayBuffer();
    const imageTags = ExifReader.load(fileArrayBuffer);
    const cameraModel = imageTags?.Model?.description || 'Unknown';

    // upload image to personal Imgur album and retrieve image link
    // for anonymous non-album upload, change Authorization header to
    // `Client-ID ${process.env.IMGUR_CLIENT_ID}`
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.IMGUR_ACCESS_TOKEN}`,
      },
      body: formData,
    }).then((data) => data.json());
    // extract Imgur link and hash
    const imageLink = response.data.link;
    const imageHash = response.data.id;

    // upload photo to database
    await connectMongoDB();
    const userId = formData.get('userId');
    const title = formData.get('title');
    const description = formData.get('description');
    const photo = await Photo.create({
      uploader: userId,
      link: imageLink,
      hash: imageHash,
      title: title,
      description: description,
      cameraModel: cameraModel,
    });

    // overall feedback log
    console.log(`Photo ${imageLink} saved by user ${session?.user?.email}`);

    return new Response(JSON.stringify(photo), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Image Upload Failed', { status: 500 });
  }
};
