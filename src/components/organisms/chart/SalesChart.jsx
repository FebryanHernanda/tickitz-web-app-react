import { Line } from "react-chartjs-2";
import { getDataSalesByCategory } from "../../../data/chart/salesData";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../../store/slices/moviesSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const SalesChart = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);

  const [moviesName, setMoviesName] = useState("All Movies");
  const [timeCategory, setTimeCategory] = useState("monthly");
  const [chartData, setChartData] = useState(getDataSalesByCategory("monthly"));

  useEffect(() => {
    if (!movies.length) dispatch(fetchMovies({ page: 1 }));
  }, [dispatch, movies]);

  const handleTimeChange = (e) => setTimeCategory(e.target.value);
  const handleMoviesName = (e) => setMoviesName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChartData(getDataSalesByCategory(timeCategory));
  };

  const optionsSales = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: moviesName,
        align: "start",
        marginBottom: 20,
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
          left: 0,
          right: 0,
        },
      },
    },
  };

  return (
    <section
      className="flex h-full w-full flex-col gap-5 rounded-[20px] bg-white !p-5 xl:w-1/2"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl">Sales Chart</h1>

      <form className="flex gap-5 !pt-2" id="salesChartForm">
        {/* Movies Name */}
        <label htmlFor="moviesname" className="rounded-[8px] bg-[#EFF0F6] !p-1">
          <select
            name="moviesName"
            id="moviesName"
            className="w-[100px] md:w-[220px]"
            value={moviesName}
            onChange={handleMoviesName}
          >
            <option value="" disabled>
              Movies Name
            </option>
            {movies.map((item) => {
              return (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              );
            })}

            {/* <option value="Man with No Past">Man with No Past</option> */}
          </select>
        </label>

        {/* Time */}
        <label htmlFor="time" className="rounded-[8px] bg-[#EFF0F6] !p-1">
          <select
            name="time"
            id="time"
            className="w-[100px]"
            value={timeCategory}
            onChange={handleTimeChange}
          >
            <option value="yearsly">Yearsly</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-[100px] rounded-[9px] bg-blue-700 !p-1 text-white"
        >
          Filter
        </button>
      </form>

      <div className="w-full">
        <Line options={optionsSales} data={chartData} />
      </div>
    </section>
  );
};

export default SalesChart;
