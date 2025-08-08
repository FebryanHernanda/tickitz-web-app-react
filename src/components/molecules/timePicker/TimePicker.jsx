const TimePicker = ({ isOpen }) => {
  return (
    <div
      id="dropdownTimepicker"
      className="flex w-auto flex-col items-center gap-5 rounded-lg border-1 border-gray-400 bg-white p-3 shadow-2xl"
    >
      <div className="flex flex-col gap-5 text-center">
        <label
          htmlFor="start-time"
          className="text-md w-50 text-lg font-medium text-blue-900"
        >
          Movies Time:
        </label>
        <div className="flex justify-between gap-2.5">
          <input
            type="time"
            id="start-time"
            className="w-full rounded-lg border border-gray-400 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            min="09:00"
            max="18:00"
            defaultValue="00:00"
            required
          />
          <select name="times" className="rounded-lg border-1 border-gray-400">
            <option value="A.M">A.M</option>
            <option value="P.M">P.M</option>
          </select>
        </div>
      </div>
      <button
        id="saveTimeButton"
        type="button"
        className="flex items-center rounded-lg bg-blue-700 p-1 px-5 text-white"
        onClick={isOpen}
      >
        Save time
      </button>
    </div>
  );
};

export default TimePicker;
