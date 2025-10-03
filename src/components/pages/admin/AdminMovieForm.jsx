import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCinemasSchedule,
  addMoviesData,
} from "../../../store/slices/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminMovieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genresList, directorsList, castList } = useSelector(
    (state) => state.movies,
  );

  const { cinemaList, cinemaLocationList } = useSelector(
    (state) => state.cinema,
  );

  const scheduleTimes = ["10:00", "13:00", "16:00", "19:00", "22:00"];

  const [movieForm, setMovieForm] = useState({
    title: "",
    synopsis: "",
    releaseDate: "",
    durationHours: "",
    durationMinutes: "",
    movieRating: "",
    ageRating: "",
    genre: [],
    director: [],
    cast: [],
    poster: null,
    backdrop: null,
  });

  // New combined schedule state
  const [tempSchedule, setTempSchedule] = useState({
    movieDate: "",
    showTime: [],
    cinema: [],
    cinemaLocation: [],
  });

  const [schedules, setSchedules] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleDataChange = (e) => {
    const { name, value, files } = e.target;
    setMovieForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setErrorMsg("");
  };

  const handleTempScheduleChange = (e) => {
    const { name, value } = e.target;
    setTempSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!schedules.length) {
      setErrorMsg("Please add at least one schedule!");
      return false;
    }
    if (
      Object.entries(movieForm).some(([key, value]) => {
        if (key === "poster" || key === "backdrop") return false;
        return !value || value === "";
      })
    ) {
      setErrorMsg("Please fill in all field columns!");
      return false;
    }
    return true;
  };

  // Add combined schedule
  const addCombinedSchedule = () => {
    if (
      !tempSchedule.movieDate ||
      !tempSchedule.showTime.length ||
      !tempSchedule.cinema.length ||
      !tempSchedule.cinemaLocation.length
    ) {
      toast.error("Please fill in all schedule fields before adding!", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    const newSchedules = [];
    let duplicateCount = 0;

    tempSchedule.cinema.forEach((cinemaId) => {
      tempSchedule.cinemaLocation.forEach((locationId) => {
        tempSchedule.showTime.forEach((time) => {
          const cinema = cinemaList.find((c) => c.id === cinemaId);
          const location = cinemaLocationList.find((l) => l.id === locationId);

          const isDuplicate = schedules.some(
            (existingSchedule) =>
              existingSchedule.date === tempSchedule.movieDate &&
              existingSchedule.time === time &&
              existingSchedule.cinemaId === cinemaId &&
              existingSchedule.locationId === locationId,
          );

          if (isDuplicate) {
            duplicateCount++;
            console.log(
              `Duplicate found: ${tempSchedule.movieDate} - ${time} - ${cinema?.name} - ${location?.name}`,
            );
          } else {
            newSchedules.push({
              date: tempSchedule.movieDate,
              time: time,
              cinemaId: cinemaId,
              cinemaName: cinema?.name || "Cinema not found",
              locationId: locationId,
              locationName: location?.name || "Location not found",
            });
          }
        });
      });
    });

    if (duplicateCount > 0) {
      toast.warning(
        `${duplicateCount} the schedule already exists and is not being added`,
        {
          position: "top-center",
          autoClose: 1000,
        },
      );
    }

    if (newSchedules.length > 0) {
      setSchedules((prev) => [...prev, ...newSchedules]);
      toast.success(`Successfuly added ${newSchedules.length} schedule!`, {
        position: "top-center",
        autoClose: 1000,
      });
    }

    setTempSchedule({
      movieDate: "",
      showTime: [],
      cinema: [],
      cinemaLocation: [],
    });
  };

  // Remove individual schedule
  const removeSchedule = (index) => {
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!validate()) {
      setIsValid(false);
      return;
    }
    setIsValid(true);

    try {
      const duration =
        parseInt(movieForm.durationHours || 0) * 60 +
        parseInt(movieForm.durationMinutes || 0);

      // Group schedules by date and time for movie schedules
      const uniqueSchedules = schedules.reduce((acc, curr) => {
        const key = `${curr.date}-${curr.time}`;
        if (!acc.find((s) => `${s.date}-${s.time}` === key)) {
          acc.push({ date: curr.date, time: curr.time });
        }
        return acc;
      }, []);

      const formData = new FormData();
      formData.append("title", movieForm.title);
      formData.append("synopsis", movieForm.synopsis);
      formData.append("release_date", movieForm.releaseDate);
      formData.append("duration", duration);
      formData.append("rating", parseFloat(movieForm.movieRating) || 0);
      formData.append("age_rating", movieForm.ageRating);
      formData.append("director_id", parseInt(movieForm.director[0] || 0));
      formData.append("genres", JSON.stringify(movieForm.genre || []));
      formData.append("casts", JSON.stringify(movieForm.cast || []));
      formData.append("schedules", JSON.stringify(uniqueSchedules));

      if (movieForm.poster) formData.append("poster", movieForm.poster);
      if (movieForm.backdrop) formData.append("backdrop", movieForm.backdrop);

      // Dispatch add movies
      const resultAction = await dispatch(addMoviesData(formData));

      if (addMoviesData.fulfilled.match(resultAction)) {
        const movieData = resultAction.payload.data;
        console.log("Movie added:", movieData);

        // Create cinema schedule payload from the combined schedules
        const cinemaSchedulePayload = schedules.map((schedule, index) => ({
          cinemas_id: schedule.cinemaId,
          locations_id: schedule.locationId,
          schedules_id:
            movieData.schedule_ids?.[index] || movieData.schedule_ids?.[0],
        }));

        // Add cinema schedules
        if (cinemaSchedulePayload.length > 0) {
          await dispatch(addCinemasSchedule(cinemaSchedulePayload));
        }

        toast.success("Movie and schedule added successfully!", {
          position: "top-center",
          autoClose: 1000,
        });

        // Reset form
        setMovieForm({
          title: "",
          synopsis: "",
          releaseDate: "",
          durationHours: "",
          durationMinutes: "",
          movieRating: "",
          ageRating: "",
          genre: [],
          director: [],
          cast: [],
          poster: null,
          backdrop: null,
        });
        setSchedules([]);
        setTempSchedule({
          movieDate: "",
          showTime: [],
          cinema: [],
          cinemaLocation: [],
        });
        navigate("/admin/data");
      } else {
        console.error("Movie add failed: ", resultAction.payload);
        toast.error("Failed to add movie", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while submitting movie", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  // Add Picker helper
  const renderAddPicker = (label, fieldName, list, isTemp = false) => {
    const formData = isTemp ? tempSchedule : movieForm;
    const setFormData = isTemp ? setTempSchedule : setMovieForm;

    return (
      <div className="flex w-full flex-col gap-2">
        <label className="mb-1 block font-medium">{label}</label>
        <div className="mb-1 flex flex-wrap gap-2">
          {formData[fieldName].map((id) => {
            const item = list.find((i) => i.id === id);
            return (
              <span
                key={id}
                className="flex items-center justify-between gap-5 rounded border border-gray-300 px-2 py-1 text-sm"
              >
                {item?.name}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      [fieldName]: prev[fieldName].filter((v) => v !== id),
                    }))
                  }
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
        <select
          className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!value) return;
            if (!formData[fieldName].includes(value)) {
              setFormData((prev) => ({
                ...prev,
                [fieldName]: [...prev[fieldName], value],
              }));
            }
            e.target.value = "";
          }}
        >
          <option value="">Select {label.toLowerCase()}...</option>
          {list
            .filter((i) => !formData[fieldName].includes(i.id))
            .map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
        </select>
      </div>
    );
  };

  // Combined Schedule Picker
  const renderCombinedSchedulePicker = () => (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-300 p-4">
      <h3 className="font-medium text-gray-800">Add Schedule</h3>

      {/* Date Input */}
      <div className="flex flex-col gap-2">
        <label className="mb-1 block font-medium">Movie Date</label>
        <input
          type="date"
          className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
          name="movieDate"
          value={tempSchedule.movieDate}
          onChange={handleTempScheduleChange}
          required
        />
      </div>

      {/* Show Time Selection */}
      <div className="flex flex-col gap-2">
        <label className="mb-1 block font-medium">Schedule Time</label>
        {tempSchedule.showTime.length > 0 && (
          <div className="mb-1 flex flex-wrap gap-2">
            {tempSchedule.showTime.map((time, idx) => (
              <span
                key={idx}
                className="flex items-center justify-between gap-2 rounded border border-gray-300 px-2 py-1 text-sm"
              >
                {time}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() =>
                    setTempSchedule((prev) => ({
                      ...prev,
                      showTime: prev.showTime.filter((_, i) => i !== idx),
                    }))
                  }
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <select
          className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;
            if (!tempSchedule.showTime.includes(value)) {
              setTempSchedule((prev) => ({
                ...prev,
                showTime: [...prev.showTime, value],
              }));
            }
            e.target.value = "";
          }}
        >
          <option value="">Select time...</option>
          {scheduleTimes
            .filter((t) => !tempSchedule.showTime.includes(t))
            .map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
        </select>
      </div>

      {/* Cinema and Location Selection */}
      <div className="flex gap-4">
        {renderAddPicker("Cinema", "cinema", cinemaList, true)}
        {renderAddPicker(
          "Cinema Location",
          "cinemaLocation",
          cinemaLocationList,
          true,
        )}
      </div>

      <button
        type="button"
        onClick={addCombinedSchedule}
        className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Add Schedule
      </button>
    </div>
  );

  return (
    <section className="bg-gray-200 p-5">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="flex flex-col gap-5 rounded-lg bg-white p-5 shadow-md lg:p-10">
          <h2 className="text-lg font-semibold">Add New Movie</h2>

          {/* Poster & Backdrop */}
          <div className="flex gap-5">
            <div className="flex flex-col gap-2">
              <label className="mb-1 block font-medium">Poster</label>
              <input
                type="file"
                name="poster"
                accept="image/*"
                onChange={handleDataChange}
                className="w-full cursor-pointer rounded-md border border-gray-400 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="mb-1 block font-medium">Backdrop</label>
              <input
                type="file"
                name="backdrop"
                accept="image/*"
                onChange={handleDataChange}
                className="w-full cursor-pointer rounded-md border border-gray-400 bg-white px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
              />
            </div>
          </div>

          {/* Movie Title */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Movie Title</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
              name="title"
              value={movieForm.title}
              onChange={handleDataChange}
              required
            />
          </div>

          {/* Synopsis */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Synopsis</label>
            <textarea
              rows="3"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
              name="synopsis"
              value={movieForm.synopsis}
              onChange={handleDataChange}
              required
            />
          </div>

          {/* Release Date & Duration */}
          <div className="flex gap-5">
            <div className="flex w-full flex-col gap-2">
              <label className="mb-1 block font-medium">Release Date</label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
                name="releaseDate"
                value={movieForm.releaseDate}
                onChange={handleDataChange}
                required
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <label className="mb-1 block font-medium">
                Duration (Hours & Minutes)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Hours"
                  className="w-1/2 rounded-md border border-gray-400 px-3 py-2 text-sm"
                  name="durationHours"
                  value={movieForm.durationHours}
                  onChange={handleDataChange}
                  max={10}
                  required
                />
                <input
                  type="number"
                  placeholder="Minutes"
                  className="w-1/2 rounded-md border border-gray-400 px-3 py-2 text-sm"
                  name="durationMinutes"
                  value={movieForm.durationMinutes}
                  onChange={handleDataChange}
                  max={60}
                  required
                />
              </div>
            </div>
          </div>

          {/* Field Rating */}
          <div className="flex justify-between gap-5">
            <div className="flex w-full flex-col gap-2">
              <label className="mb-1 block font-medium">Movie Rating</label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
                name="movieRating"
                value={movieForm.movieRating}
                onChange={handleDataChange}
                required
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <label className="mb-1 block font-medium">Movie Age Rating</label>
              <select
                className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
                name="ageRating"
                value={movieForm.ageRating}
                onChange={handleDataChange}
                required
              >
                <option value="">Select age rating...</option>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
              </select>
            </div>
          </div>

          {/* Multiple Add Pickers */}
          <div className="flex justify-between gap-5">
            {renderAddPicker("Genres", "genre", genresList)}
            {renderAddPicker("Director", "director", directorsList)}
          </div>
          {renderAddPicker("Cast", "cast", castList)}

          {/* Combined Schedule Picker */}
          {renderCombinedSchedulePicker()}

          {/* Display Added Schedules */}
          {schedules.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-gray-800">Added Schedules</h3>
              <div className="max-h-60 overflow-y-auto rounded border border-gray-300 p-3">
                {schedules.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="mb-2 flex items-center justify-between rounded border border-gray-200 p-2 text-sm"
                  >
                    <span>
                      {schedule.date} | {schedule.time} | {schedule.cinemaName}{" "}
                      | {schedule.locationName}
                    </span>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeSchedule(idx)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            className="w-full rounded-md bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save Movie
          </button>

          {!isValid && (
            <span className="text-center text-red-500">{errorMsg}</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminMovieForm;
