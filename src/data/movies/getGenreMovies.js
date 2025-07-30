import fetchData from "../../services/api";

const getGenre = async (apiKey) => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  const data = await fetchData(url);
  return data.genres;
};

export default getGenre;
