import Photo from '@components/Photo';

export const generateMetadata = async ({ params }) => {
  const id = params.id;
  // server-side fetching is possible, but needs a direct URL e.g. http://localhost:3000
  // therefore i'm opting for just using id for simple deployment management on Vercel
  // https://stackoverflow.com/a/76311855
  // https://github.com/vercel/next.js/issues/48344

  // const response = await fetch(`${process.env.URL}/api/photo/${id}`);
  // const photo = await response.json();

  return {
    title: `Photo ${id}`, // photo.title
  };
};

const PhotoDisplay = ({ params }) => {
  return <Photo id={params.id} />;
};
export default PhotoDisplay;
