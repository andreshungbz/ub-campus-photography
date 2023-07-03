// Route Handler for Retrieving User from Database

import User from '@models/user';
import { connectMongoDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const user = await User.findById(params.id);
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to Fetch User', {
      status: 500,
      statusText: 'Error: User Does Not Exist',
    });
  }
};
