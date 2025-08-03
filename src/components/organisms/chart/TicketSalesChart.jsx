const TicketSalesChart = () => {
  return (
    <>
      <section className="ticket-sales flex flex-col gap-5 rounded-[20px] bg-white !p-5">
        <h1 className="text-xl">Ticket Sales</h1>
        <form className="flex gap-5 pt-2" id="ticketSalesForm">
          {/* <!-- category Name --> */}
          <label
            htmlFor="category-name"
            className="rounded-[8px] bg-[#EFF0F6] !p-1"
          >
            <select
              name="category-name"
              id="category-name"
              className="w-[100px] md:w-[220px]"
            >
              <option value="">Category</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
            </select>
          </label>

          {/* <!-- times --> */}
          <label htmlFor="location" className="rounded-[8px] bg-[#EFF0F6] !p-1">
            <select name="location" id="location" className="w-[100px]">
              <option value="">Location</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Bogor">Bogor</option>
            </select>
          </label>
          <button className="w-[100px] rounded-[9px] bg-blue-700 text-white">
            Filter
          </button>
        </form>

        <div className="w-full"></div>
      </section>
    </>
  );
};

export default TicketSalesChart;
