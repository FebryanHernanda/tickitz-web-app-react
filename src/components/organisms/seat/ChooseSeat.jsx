const rows = ["A", "B", "C", "D", "E", "F", "G"];
const leftCols = [1, 2, 3, 4, 5, 6, 7];
const rightCols = [8, 9, 10, 11, 12, 13, 14];

/* Dummy Sold Seats data */
const soldSeats = [
  "A6",
  "B2",
  "B3",
  "D2",
  "E4",
  "G3",
  "A13",
  "C9",
  "C15",
  "C12",
  "D9",
  "D12",
  "F13",
];

const ChooseSeat = (props) => {
  const { setSeat } = props;

  /* Handle Seat Change Value */
  const handleChange = (e) => {
    const seat = e.target.value;
    if (e.target.checked) {
      setSeat((prev) => [...prev, seat]);
    } else {
      setSeat((prev) => prev.filter((s) => s !== seat));
    }
  };

  /* Render All Seat  */
  const renderSeat = (row, col) => {
    const seat = `${row}${col}`;

    const isSold = soldSeats.includes(seat);

    return (
      <label key={seat} className="relative">
        <input
          type="checkbox"
          name="seats"
          value={seat}
          disabled={isSold}
          onChange={handleChange}
          className="peer hidden"
        />
        <div
          className={`flex h-5 w-5 cursor-pointer rounded-md text-sm font-medium md:h-8 md:w-8 ${
            isSold
              ? "cursor-not-allowed bg-gray-300 text-white"
              : "border border-gray-300 bg-white peer-checked:bg-blue-600 peer-checked:text-white hover:border-none hover:bg-blue-100"
          }`}
        ></div>
      </label>
    );
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Sreen */}
      <div className="lg:text-md w-full rounded-sm bg-gray-100 p-2 text-center text-gray-500 md:rounded-md xl:w-210">
        Screen
      </div>

      {/* Container */}
      <div className="flex w-full flex-col gap-2">
        {/* Render Row Seat */}
        {rows.map((row) => (
          <div key={row} className="flex justify-around gap-4">
            {/* Grid Container */}
            <div className="flex gap-1">
              {/* Row Label */}
              <div className="hidden h-5 w-5 items-center justify-center text-sm md:flex md:h-8 md:w-8 md:text-xl">
                {row}
              </div>
              {/* Row Label */}

              {/* Left Grid, render left cols grid*/}
              <div className="grid grid-cols-7 gap-2">
                {leftCols.map((col) => renderSeat(row, col))}
              </div>
              {/* Left Grid, render left cols grid*/}
            </div>

            {/* Right grid, render right cols grid */}
            <div className="grid grid-cols-7 gap-2">
              {rightCols.map((col) => renderSeat(row, col))}
            </div>
            {/* Right grid, render right cols grid */}
          </div>
        ))}
        {/* Show all Seat */}

        {/* Seat Column Label */}
        <div className="relative">
          {/* left Label */}
          <div className="absolute hidden grid-cols-7 gap-[6px] md:left-16 md:grid md:gap-[20px] lg:left-8 lg:gap-[6px] xl:left-27 xl:gap-[8px] 2xl:left-36">
            {leftCols.map((col, idx) => {
              return (
                <div
                  key={idx}
                  className="text-md flex h-5 w-5 cursor-pointer items-center justify-center rounded-md font-medium lg:h-8 lg:w-8"
                >
                  {col}
                </div>
              );
            })}
          </div>
          {/* left Label */}

          {/* Right Label */}
          <div className="absolute right-[-2px] hidden grid-cols-7 gap-[6px] md:right-[30px] md:grid md:gap-[20px] lg:right-[-2px] lg:gap-[6px] xl:right-[70px] xl:gap-[8px] 2xl:right-[110px]">
            {rightCols.map((col, idx) => {
              return (
                <div
                  key={idx}
                  className="text-md flex h-5 w-5 cursor-pointer items-center justify-center rounded-md font-medium lg:h-8 lg:w-8"
                >
                  {col}
                </div>
              );
            })}
          </div>
          {/* Right Label */}
        </div>
        {/* Seat Label */}
      </div>
    </div>
  );
};

export default ChooseSeat;
