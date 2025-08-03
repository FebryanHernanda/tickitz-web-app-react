import fetchData from "../../services/api";

const getDetailsMovies = async (apiKey, movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  const data = await fetchData(url);
  return data;
};

export default getDetailsMovies;
