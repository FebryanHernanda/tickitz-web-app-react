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
    cinema: [],
    cinemaLocation: [],
    movieDate: "",
    showTime: [],
    poster: null,
    backdrop: null,
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

  const validate = () => {
    if (!movieForm.showTime.length && !schedules.length) {
      setErrorMsg("Please fill in the broadcast time!");
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

  // Add schedule
  const addSchedule = () => {
    if (!movieForm.movieDate || !movieForm.showTime.length) return;
    const newSchedules = movieForm.showTime.map((time) => ({
      date: movieForm.movieDate,
      time,
    }));
    setSchedules((prev) => [...prev, ...newSchedules]);
    setMovieForm((prev) => ({ ...prev, showTime: [] }));
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

      // parse date and time to schedules array
      const schedulesArray = (schedules || []).map((s) => ({
        date: s.date,
        time: s.time,
      }));

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
      formData.append("schedules", JSON.stringify(schedulesArray));

      if (movieForm.poster) formData.append("poster", movieForm.poster);
      if (movieForm.backdrop) formData.append("backdrop", movieForm.backdrop);

      // dispatch add movies
      const resultAction = await dispatch(addMoviesData(formData));

      /* Check if response ok and get the payload for get schedules_id */
      if (addMoviesData.fulfilled.match(resultAction)) {
        const movieData = resultAction.payload.data;
        console.log("Movie added:", movieData);

        // get payload for cinemaSchedule
        const cinemaSchedulePayload = [];
        (movieForm.cinema || []).forEach((cinemaID) => {
          (movieForm.cinemaLocation || []).forEach((locationID) => {
            (movieData.schedule_ids || []).forEach((scheduleID) => {
              cinemaSchedulePayload.push({
                cinemas_id: cinemaID,
                locations_id: locationID,
                schedules_id: scheduleID,
              });
            });
          });
        });
        console.log("Cinema schedule payload:", cinemaSchedulePayload);

        // add cinema schedules
        if (cinemaSchedulePayload.length > 0) {
          await dispatch(addCinemasSchedule(cinemaSchedulePayload));
        }

        toast.success("Movie and schedule added successfully!", {
          position: "top-center",
          autoClose: 1000,
        });

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
          cinema: [],
          cinemaLocation: [],
          movieDate: "",
          showTime: [],
          poster: null,
          backdrop: null,
        });
        setSchedules([]);
        navigate("/admin/data");
      } else {
        console.error("Movie add failed: ", resultAction.payload);
        toast.error("Gagal menambahkan movie");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat submit movie");
    }
  };

  // Add Picker helper
  const renderAddPicker = (label, fieldName, list) => (
    <div className="flex w-full flex-col gap-2">
      <label className="mb-1 block font-medium">{label}</label>
      <div className="mb-1 flex flex-wrap gap-2">
        {movieForm[fieldName].map((id) => {
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
                  setMovieForm((prev) => ({
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
          if (!movieForm[fieldName].includes(value)) {
            setMovieForm((prev) => ({
              ...prev,
              [fieldName]: [...prev[fieldName], value],
            }));
          }
          e.target.value = "";
        }}
      >
        <option value="">Select {label.toLowerCase()}...</option>
        {list
          .filter((i) => !movieForm[fieldName].includes(i.id))
          .map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
      </select>
    </div>
  );

  /* ! Time Picker */
  const renderTimePicker = () => (
    <div className="flex gap-5">
      <div className="flex w-full flex-col gap-2">
        <label className="mb-1 block font-medium">Movie Date</label>
        <input
          type="date"
          className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
          name="movieDate"
          value={movieForm.movieDate}
          onChange={handleDataChange}
          required
        />
        <button
          type="button"
          onClick={addSchedule}
          className="mt-1 w-1/4 rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          Add Schedule
        </button>
      </div>

      <div className="full flex w-full flex-col gap-2">
        <label className="mb-1 block font-medium">Schedule Time</label>
        {movieForm.showTime.length > 0 && (
          <div className="mb-1 flex flex-wrap gap-2">
            {movieForm.showTime.map((time, idx) => (
              <span
                key={idx}
                className="flex items-center justify-between gap-2 rounded border border-gray-300 px-2 py-1 text-sm"
              >
                {time}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() =>
                    setMovieForm((prev) => ({
                      ...prev,
                      showTime: prev.showTime.filter((_, i) => i !== idx),
                    }))
                  }
                >
                  x
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
            if (!movieForm.showTime.includes(value)) {
              setMovieForm((prev) => ({
                ...prev,
                showTime: [...prev.showTime, value],
              }));
            }
            e.target.value = "";
          }}
        >
          <option value="">Select time...</option>
          {scheduleTimes
            .filter((t) => !movieForm.showTime.includes(t))
            .map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
        </select>
        {schedules.length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            {schedules.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded border border-gray-300 px-2 py-1 text-sm"
              >
                <span>
                  {s.date} - {s.time}
                </span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() =>
                    setSchedules((prev) => prev.filter((_, i) => i !== idx))
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
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
          <div className="flex justify-between gap-5">
            {renderAddPicker("Cinema", "cinema", cinemaList)}
            {renderAddPicker(
              "Cinema Location",
              "cinemaLocation",
              cinemaLocationList,
            )}
          </div>

          {/* Time Picker */}
          {renderTimePicker()}

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
