import Photo from '@components/Photo';

const PhotoDisplay = ({ params }) => {
  return <Photo id={params.id} />;
};
export default PhotoDisplay;
