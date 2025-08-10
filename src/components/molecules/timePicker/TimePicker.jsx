const TimePicker = ({ isOpen, setMovieForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const startTime = e.target.startTime.value;
    const times = e.target.times.value;
    const fulltime = `${startTime} ${times}`;

    setMovieForm((prevData) => ({
      ...prevData,
      showTime: [...prevData.showTime, fulltime],
    }));

    isOpen(false);
  };

  return (
    <form
      id="dropdownTimepicker"
      className="flex w-auto flex-col items-center gap-5 rounded-lg border-1 border-gray-400 bg-white p-3 shadow-2xl"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-5 text-center">
        <label
          htmlFor="startTime"
          className="text-md w-50 text-lg font-medium text-blue-900"
        >
          Movies Time:
        </label>
        <div className="flex justify-between gap-2.5">
          <input
            type="time"
            id="startTime"
            name="startTime"
            className="w-full rounded-lg border border-gray-400 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-blue-500"
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
        type="submit"
        className="flex items-center rounded-lg bg-blue-700 p-1 px-5 text-white"
      >
        Save time
      </button>
    </form>
  );
};

export default TimePicker;
