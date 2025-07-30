import fetchData from "../../services/api";

const getPopularMovies = async (apiKey) => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const data = await fetchData(url);
  return data.results;
};

export default getPopularMovies;
