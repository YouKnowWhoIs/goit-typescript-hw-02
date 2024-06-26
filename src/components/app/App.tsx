import { useState, useEffect } from "react";
import "./App.css";

import { fetchImages } from "../api/api.js";
import { ImageGallery } from "../imageGallery/imageGallery.jsx";
import { SearchBar } from "../searchBar/searchBar.jsx";
import { Loading } from "../loader/loader.jsx";
import { Error } from "../errorMessage/errorMessage.js";
import { LoadMoreBtn } from "../loadMoreBtn/loadMoreBtn.jsx";
import { ImageModal } from "../imageModal/imageModal.jsx";

interface MyImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

export interface Image {
  id: string;
  urls: {
    small: string;
    regular?: string;
  };
  alt_description: string;
}

function App() {
  const [images, setImages] = useState<MyImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<Image | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        if (searchInput === "") {
          return;
        }
        const resData = await fetchImages(searchInput, page);
        setImages((prevImages) => [...prevImages, ...resData]);
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

  const onSearchSuccess: (hasResults: boolean) => void = (hasResults) => {
    setLoadMoreBtn(hasResults);
  };

  const handleOpen = async (image: Image) => {
    setSelectedImages(image);
    console.log(image);

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
            imageModal={selectedImages}
          />
        )}
      </div>
    </>
  );
}

export default App;
