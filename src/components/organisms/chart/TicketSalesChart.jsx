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
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMovies } from "../../../store/slices/moviesSlice";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { getDataTicketSalesByCategory } from "../../../data/chart/ticketSalesData";

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

const TicketSalesChart = () => {
  const [categoryName, setCategoryName] = useState("Horror");
  const [locationName, setLocationName] = useState("Jakarta");
  const [chartData, setChartData] = useState(
    getDataTicketSalesByCategory("Jakarta"),
  );

  const handleLocationName = (e) => setLocationName(e.target.value);
  const handleCategoryName = (e) => setCategoryName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChartData(getDataTicketSalesByCategory(locationName));
  };

  const optionsSales = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `${categoryName}, ${locationName}`,
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
    <>
      <section className="flex h-full w-full flex-col gap-5 rounded-[20px] bg-white !p-5 xl:w-1/2">
        <h1 className="text-xl">Ticket Sales</h1>
        <form
          className="flex gap-5 pt-2"
          id="ticketSalesForm"
          onSubmit={handleSubmit}
        >
          {/* <!-- category Name --> */}
          <label
            htmlFor="category-name"
            className="rounded-[8px] bg-[#EFF0F6] !p-1"
          >
            <select
              name="category-name"
              id="category-name"
              className="w-[100px] md:w-[220px]"
              value={categoryName}
              onChange={handleCategoryName}
            >
              <option value="" disabled>
                Category
              </option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          </label>

          {/* <!-- times --> */}
          <label htmlFor="location" className="rounded-[8px] bg-[#EFF0F6] !p-1">
            <select
              name="location"
              id="location"
              className="w-[100px]"
              value={locationName}
              onChange={handleLocationName}
            >
              <option value="" disabled>
                Location
              </option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Bogor">Bogor</option>
            </select>
          </label>
          <button className="w-[100px] rounded-[9px] bg-blue-700 text-white">
            Filter
          </button>
        </form>

        <div className="w-full">
          <Line options={optionsSales} data={chartData} />
        </div>
      </section>
    </>
  );
};

export default TicketSalesChart;
