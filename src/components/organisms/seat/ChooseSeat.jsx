import { useDispatch, useSelector } from "react-redux";
import { getSoldSeat } from "../../../store/slices/cinemaSlice";
import { useEffect } from "react";

const rows = ["A", "B", "C", "D", "E", "F", "G"];
const leftCols = [1, 2, 3, 4, 5, 6, 7];
const rightCols = [8, 9, 10, 11, 12, 13, 14];
const totalCols = 14;

const ChooseSeat = (props) => {
  const { setSeat, setSeatLabel, cinemasID } = props;
  const dispatch = useDispatch();
  const { seatData } = useSelector((state) => state.cinema);

  useEffect(() => {
    dispatch(getSoldSeat(cinemasID));
  }, [dispatch, cinemasID]);

  // Convert Seat_id for for get the seat label
  const getSeatLabel = (seat_id) => {
    const rowIndex = Math.floor((seat_id - 1) / totalCols);
    const colIndex = ((seat_id - 1) % totalCols) + 1;
    return `${rows[rowIndex]}${colIndex}`;
  };

  // Handle Seat Change Value
  const handleChange = (e) => {
    const seat_id = Number(e.target.value);
    const label = getSeatLabel(seat_id);

    if (e.target.checked) {
      setSeat((prev) => [...prev, seat_id]);
      setSeatLabel((prev) => [...prev, label]);
    } else {
      setSeat((prev) => prev.filter((s) => s !== seat_id));
      setSeatLabel((prev) => prev.filter((l) => l !== label));
    }
  };

  // Render All Seat
  const renderSeat = (row, col) => {
    const rowIndex = rows.indexOf(row);
    const seat_id = rowIndex * totalCols + col;
    const seatLabel = getSeatLabel(seat_id);

    const soldSeatIds = (seatData || []).map((item) => item.seat_id);
    const isSold = soldSeatIds.includes(seat_id);

    return (
      <label key={seatLabel} className="relative">
        <input
          type="checkbox"
          name="seats"
          value={seat_id}
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
      {/* Screen */}
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
              {/* Left Grid */}
              <div className="grid grid-cols-7 gap-2">
                {leftCols.map((col) => renderSeat(row, col))}
              </div>
            </div>

            {/* Right Grid */}
            <div className="grid grid-cols-7 gap-2">
              {rightCols.map((col) => renderSeat(row, col))}
            </div>
          </div>
        ))}

        {/* Seat Column Label */}
        <div className="relative">
          {/* Left Label */}
          <div className="absolute hidden grid-cols-7 gap-[6px] md:left-16 md:grid md:gap-[20px] lg:left-8 lg:gap-[6px] xl:left-27 xl:gap-[8px] 2xl:left-36">
            {leftCols.map((col, idx) => (
              <div
                key={idx}
                className="text-md flex h-5 w-5 items-center justify-center rounded-md font-medium lg:h-8 lg:w-8"
              >
                {col}
              </div>
            ))}
          </div>

          {/* Right Label */}
          <div className="absolute right-[-2px] hidden grid-cols-7 gap-[6px] md:right-[30px] md:grid md:gap-[20px] lg:right-[-2px] lg:gap-[6px] xl:right-[70px] xl:gap-[8px] 2xl:right-[110px]">
            {rightCols.map((col, idx) => (
              <div
                key={idx}
                className="text-md flex h-5 w-5 items-center justify-center rounded-md font-medium lg:h-8 lg:w-8"
              >
                {col}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSeat;
