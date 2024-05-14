import { useState, useEffect } from "react";
import "./App.css";

import { fetchImages } from "../api/api.js";
import { ImageGallery } from "../imageGallery/imageGallery.jsx";
import { SearchBar } from "../searchBar/searchBar.jsx";
import { Loading } from "../loader/loader.jsx";
import { Error } from "../errorMessage/errorMessage.js";
import { LoadMoreBtn } from "../loadMoreBtn/loadMoreBtn.jsx";
import { ImageModal } from "../imageModal/imageModal.jsx";

interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        if (searchInput === "") {
          return;
        }
        const resData = await fetchImages(searchInput, page);
        setImages((prevImages: Image[]) => [...prevImages, ...resData]);
        onSearchSuccess(resData.length > 0);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchInput, page]);

  const HandleLoadMore = () => {
    setPage(page + 1);
  };

  const onSearchSuccess = (hasResults: boolean) => {
    setLoadMoreBtn(hasResults);
  };

  const handleOpen = async (image: Image) => {
    setSelectedImages(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSearchSubmit = (input: string) => {
    setImages([]);
    setSearchInput(input);
    setPage(1);
  };

  return (
    <>
      <div>
        <SearchBar
          onSearch={handleSearchSubmit}
          onSearchSuccess={onSearchSuccess}
        />
        {loading && <Loading />}
        {isError && <Error />}
        <ImageGallery images={images} handleOpen={handleOpen} />
        {loadMoreBtn && <LoadMoreBtn HandleLoadMore={HandleLoadMore} />}
        {selectedImages && (
          <ImageModal
            isOpen={isOpen}
            onRequestClose={handleClose}
            image={selectedImages}
          />
        )}
      </div>
    </>
  );
}

export default App;
