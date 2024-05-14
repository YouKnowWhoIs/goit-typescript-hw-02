import { ImageCard } from "../imageCard/imageCard";

interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  handleOpen: (image: Image) => void;
}

export const ImageGallery = ({ images, handleOpen }: ImageGalleryProps) => {
  console.log(images);
  return (
    <ul className="image-gallery-conteiner">
      {images.length > 0 &&
        images.map((image) => (
          <li key={image.id} className="image-galeri-item">
            <ImageCard
              image={image}
              handleOpen={handleOpen}
              src={image.urls.small}
              alt={image.alt_description}
            />
          </li>
        ))}
    </ul>
  );
};
