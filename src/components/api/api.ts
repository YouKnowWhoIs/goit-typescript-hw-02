import axios from "axios";

const fetchImages = async (searchInput: string, page: number) => {
  const apiKey = "soIIhOVxblDhlozBu-t3ph783hav1g27jQlrq9LvcmI";
  const perPage = 10;
  const url = `https://api.unsplash.com/search/photos?query=${searchInput}&client_id=${apiKey}&per_page=${perPage}&page=${page}`;

  const respons = await axios.get(url);

  return respons.data.results;
};

export { fetchImages };
