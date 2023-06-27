// Route Handler for Uploading New Photos to Database
// Imgur API documentation: https://apidocs.imgur.com/
// file retrieval code adapted from https://medium.com/@_hanglucas/file-upload-in-next-js-app-router-13-4-6d24f2e3d00f

export const POST = async (req) => {
  try {
    // retrieve form data
    const formData = await req.formData();

    // server-side file type validation
    const file = formData.get('image');
    const validTypes = ['image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      return new Response('Incorrect File Format', { status: 400 });
    }

    // populate formData values for Imgur
    formData.append('name', file.name);
    formData.append('album', process.env.IMGUR_ALBUM_HASH);

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

    // extract Imgur link
    const imageLink = response.data.link;
    console.log(imageLink);

    return new Response('Success', { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Image Upload Failed', { status: 500 });
  }
};
