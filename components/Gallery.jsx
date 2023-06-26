// Photo Gallery Component

import Image from 'next/image';

const Gallery = () => {
  return (
    <section className="gallery">
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="image-container">
        <Image
          src="/assets/images/placeholder.png"
          alt="University of Belize Campus Photography Logo"
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    </section>
  );
};
export default Gallery;
