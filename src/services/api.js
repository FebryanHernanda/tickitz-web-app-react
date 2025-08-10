import axios from "axios";

const fetchData = async (url) => {
  try {
    const response = await axios.request(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from server:", error);
    throw error;
  }
};

export default fetchData;
