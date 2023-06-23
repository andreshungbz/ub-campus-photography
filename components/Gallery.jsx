import Image from 'next/image';

const Gallery = () => {
  return (
    <section className="gallery">
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          className="object-cover"
        />
      </div>
    </section>
  );
};
export default Gallery;
