import Modal, { Styles } from "react-modal";

const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "fixed",
    overflow: "hidden",
    WebkitOverflowScrolling: "touch",
    outline: "none",
    padding: "0",
  },
};

interface Image {
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: (event: React.MouseEvent<Element, MouseEvent>) => void;
  imageModal: Image;
}

export const ImageModal = ({
  isOpen,
  onRequestClose,
  imageModal,
}: ImageModalProps) => {
  return (
    <>
      <Modal
        style={customStyles}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        {imageModal && (
          <img
            className="image-modal-image"
            src={imageModal.urls.regular}
            alt={imageModal.alt_description}
          />
        )}
      </Modal>
    </>
  );
};
