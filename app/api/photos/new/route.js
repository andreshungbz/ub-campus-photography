// Route Handler for Uploading New Photos to Database

import { existsSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    // retrieve form data
    // adapted from https://medium.com/@_hanglucas/file-upload-in-next-js-app-router-13-4-6d24f2e3d00f
    const formData = await req.formData();

    // define form values
    const photo = formData.get('photo');
    const description = formData.get('description');

    // save photo to server
    // adapted from https://stackoverflow.com/a/76469567
    const filePath = path.join(process.cwd(), 'public/uploads');
    const photoArrayBuffer = await photo.arrayBuffer();
    // create directory if it does not exist
    if (!existsSync(filePath)) {
      fs.mkdir(filePath, { recursive: true });
    }
    // write to file system
    await fs.writeFile(
      path.join(filePath, photo.name),
      Buffer.from(photoArrayBuffer)
    );

    return new Response('Success', { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Failed', { status: 500 });
  }
}
