import { toast, Toaster } from "react-hot-toast";
import { FormEvent } from "react";

interface SearchBarPromis {
  onSearch: (
    searchInput: string,
    onSearchSuccess: (hasResults: boolean) => void
  ) => void;
  onSearchSuccess: (hasResults: boolean) => void;
}

export const SearchBar = ({ onSearch, onSearchSuccess }: SearchBarPromis) => {
  console.log(onSearchSuccess);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const searchInput = (
      form.elements.namedItem("searchInput") as HTMLInputElement
    )?.value;
    if (searchInput.trim() === "") {
      toast.error("The search field cannot be empty!");
      return;
    }

    if (onSearch) {
      onSearch(searchInput, onSearchSuccess);
    }

    form.reset();
  };

  return (
    <header>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="searchBar-conteiner">
        <input
          className="searchBar-search"
          type="text"
          name="searchInput"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className="searchBar-button" type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
