import fetchData from "../../services/api";

const getCreditsMovies = async (apiKey, movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
  const data = await fetchData(url);
  return data;
};

export default getCreditsMovies;
