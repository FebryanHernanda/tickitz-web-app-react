const SalesChart = () => {
  return (
    <section className="sales-chart flex flex-col gap-5 rounded-[20px] bg-white !p-5">
      <h1 className="text-xl">Sales Chart</h1>

      <form className="flex gap-5 !pt-2" id="salesChartForm">
        {/* Movies Name */}
        <label
          htmlFor="movies-name"
          className="rounded-[8px] bg-[#EFF0F6] !p-1"
        >
          <select
            name="movies-name"
            id="movies-name"
            className="w-[100px] md:w-[220px]"
          >
            <option value="">Movies Name</option>
            <option value="How to Train Your Dragon">
              How to Train Your Dragon
            </option>
            <option value="Man with No Past">Man with No Past</option>
          </select>
        </label>

        {/* Time */}
        <label htmlFor="time" className="rounded-[8px] bg-[#EFF0F6] !p-1">
          <select name="time" id="time" className="w-[100px]">
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

      <div className="w-full"></div>
    </section>
  );
};

export default SalesChart;
