interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

interface ImageCardProps {
  alt: string;
  src: string;
  image: Image;
  handleOpen: (image: Image) => void;
}

export const ImageCard = ({ alt, src, handleOpen, image }: ImageCardProps) => {
  return (
    <div>
      <img
        onClick={() => handleOpen(image)}
        src={src}
        alt={alt}
        width="309"
        height="300"
      />
    </div>
  );
};
