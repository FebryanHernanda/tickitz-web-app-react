import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editMoviesData,
  getMovieEditDetail,
} from "../../../store/slices/adminSlice";

const AdminEditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieEditId } = useParams();

  const movie = useSelector((state) => state.admin.movieEditDetail);
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
  const [cinemaSchedules, setCinemaSchedules] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!movieEditId) return;

    if (!movie || movie.id !== Number(movieEditId)) {
      dispatch(getMovieEditDetail(movieEditId));
    } else {
      const hours = movie.duration ? Math.floor(movie.duration / 60) : "";
      const minutes = movie.duration ? movie.duration % 60 : "";

      setMovieForm({
        title: movie.title || "",
        synopsis: movie.synopsis || "",
        releaseDate: movie.release_date?.split("T")[0] || "",
        durationHours: hours || "",
        durationMinutes: minutes || "",
        movieRating: movie.rating || "",
        ageRating: movie.age_rating || "",
        genre: movie.genre_ids || [],
        director: movie.director_id ? [movie.director_id] : [],
        cast: movie.cast_ids || [],
        cinema: movie.cinema_schedules?.map((cs) => cs.cinemas_id) || [],
        cinemaLocation:
          movie.cinema_schedules?.map((cs) => cs.locations_id) || [],

        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
        showTime: [],
        movieDate: "",
      });

      if (movie.schedules) {
        setSchedules(movie.schedules);
      }

      if (movie.cinema_schedules) {
        setCinemaSchedules(movie.cinema_schedules);
      }
    }
  }, [dispatch, movie, movieEditId]);

  const handleDataChange = (e) => {
    const { name, value, files } = e.target;
    setMovieForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setErrorMsg("");
  };

  const validate = () => {
    if (!movieForm.title || !movieForm.synopsis || !movieForm.releaseDate) {
      setErrorMsg("Mohon isi seluruh kolom field!");
      setIsValid(false);
      return false;
    }
    setIsValid(true);
    return true;
  };

  const addSchedule = () => {
    if (!movieForm.movieDate || !movieForm.showTime.length) return;

    setSchedules((prev) => {
      const existing = prev.find((s) => s.date === movieForm.movieDate);

      if (existing) {
        const updated = prev.map((s) =>
          s.date === movieForm.movieDate
            ? { ...s, times: [...new Set([...s.times, ...movieForm.showTime])] }
            : s,
        );
        return updated;
      } else {
        const added = [
          ...prev,
          { date: movieForm.movieDate, times: movieForm.showTime },
        ];
        return added;
      }
    });

    setCinemaSchedules((prev) => {
      const newSchedules = prev.flatMap((cs, idx) => {
        console.log(`[Iterating cs ${idx}]`, cs);
        return movieForm.showTime.map((time) => {
          const newObj = {
            cinema_id: cs.cinema_id ?? cs.cinemas_id,
            location_id: cs.location_id ?? cs.locations_id,
            date: movieForm.movieDate,
            time,
          };
          return newObj;
        });
      });

      const result = [...prev, ...newSchedules];
      return result;
    });
  };

  const handleEditSubmit = async () => {
    if (!validate()) return;

    try {
      const duration =
        parseInt(movieForm.durationHours || 0) * 60 +
        parseInt(movieForm.durationMinutes || 0);

      const schedulesPayload = schedules.flatMap((s) =>
        s.times.map((time) => ({
          date: s.date,
          time,
        })),
      );

      const cinemaSchedulesPayload = cinemaSchedules.map((cs) => ({
        cinemas_id: cs.cinema_id,
        locations_id: cs.location_id,
        date: cs.date,
        time: cs.time,
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
      formData.append("schedules", JSON.stringify(schedulesPayload));
      formData.append(
        "cinemas_schedules",
        JSON.stringify(cinemaSchedulesPayload),
      );

      if (movieForm.poster instanceof File)
        formData.append("poster", movieForm.poster);
      if (movieForm.backdrop instanceof File)
        formData.append("backdrop", movieForm.backdrop);

      console.log("FormData payload:", Array.from(formData.entries()));

      const resultAction = await dispatch(
        editMoviesData({ id: movieEditId, formData }),
      );

      if (editMoviesData.fulfilled.match(resultAction)) {
        toast.success("Movie successfully updated!", {
          position: "top-center",
          autoClose: 1000,
        });
        navigate("/admin/data");
      } else {
        toast.error(resultAction.payload?.message || "Failed to update movie");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while editing the movie");
    }
  };

  const renderAddPicker = (label, fieldName, list) => {
    const selected = movieForm[fieldName] || [];

    return (
      <div className="flex w-full flex-col gap-2">
        <label className="mb-1 block font-medium">{label}</label>

        {/* Selected items */}
        <div className="mb-1 flex flex-wrap gap-2">
          {selected.map((id, idx) => {
            const item = list?.find((i) => i.id === id);
            return (
              <span
                key={idx}
                className="flex items-center justify-between gap-5 rounded border border-gray-300 px-2 py-1 text-sm"
              >
                {item?.name || id}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() =>
                    setMovieForm((prev) => ({
                      ...prev,
                      [fieldName]: (prev[fieldName] || []).filter(
                        (v) => v !== id,
                      ),
                    }))
                  }
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>

        {/* Dropdown */}
        <select
          className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!value) return;
            if (!selected.includes(value)) {
              setMovieForm((prev) => ({
                ...prev,
                [fieldName]: [...(prev[fieldName] || []), value],
              }));
            }
            e.target.value = "";
          }}
        >
          <option value="">Select {label.toLowerCase()}...</option>
          {list
            ?.filter((i) => !selected.includes(i.id))
            .map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
        </select>
      </div>
    );
  };

  const renderTimePicker = () => (
    <div className="flex gap-5">
      {/* Movie Date */}
      <div className="flex w-full flex-col gap-2">
        <label className="mb-1 block font-medium">Movie Date</label>
        <input
          type="date"
          name="movieDate"
          value={movieForm.movieDate}
          onChange={handleDataChange}
          className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={addSchedule}
          className="mt-1 w-1/4 rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
        >
          Add Schedule
        </button>
      </div>

      {/* Schedule Time */}
      <div className="flex w-full flex-col gap-2">
        <label className="mb-1 block font-medium">Schedule Time</label>

        {movieForm.showTime?.length > 0 && (
          <div className="mb-1 flex flex-wrap gap-2">
            {movieForm.showTime.map((time, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 rounded border px-2 py-1 text-sm"
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
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Dropdown */}
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

        {/* Added schedules */}
        {schedules?.length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            {schedules.map((s, idx) =>
              s.times.map((time, tIdx) => (
                <div
                  key={`${idx}-${tIdx}`}
                  className="flex items-center justify-between rounded border border-gray-300 px-2 py-1 text-sm"
                >
                  <span>
                    {s.date} - {time}
                  </span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() =>
                      setSchedules((prev) =>
                        prev.map((item, i) =>
                          i === idx
                            ? {
                                ...item,
                                times: item.times.filter((_, j) => j !== tIdx),
                              }
                            : item,
                        ),
                      )
                    }
                  >
                    ×
                  </button>
                </div>
              )),
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="bg-gray-200 p-5">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="flex flex-col gap-5 rounded-lg bg-white p-5 shadow-md lg:p-10">
          <h2 className="text-lg font-semibold">Edit Movie</h2>

          {/* Poster & Backdrop */}
          <div className="flex gap-5">
            {/* Poster */}
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

            {/* Backdrop */}
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

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={movieForm.title}
              onChange={handleDataChange}
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
            />
          </div>

          {/* Synopsis */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Synopsis</label>
            <textarea
              rows="3"
              name="synopsis"
              value={movieForm.synopsis}
              onChange={handleDataChange}
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
            />
          </div>

          {/* Release & Duration */}
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

          {/* Rating & Age Rating */}
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

          {/* Multi Pickers */}
          <div className="flex gap-5">
            {renderAddPicker("Genres", "genre", genresList)}
            {renderAddPicker("Director", "director", directorsList)}
          </div>
          {renderAddPicker("Cast", "cast", castList)}

          {/* Cinema Picker */}
          <div className="flex justify-between gap-5">
            {renderAddPicker("Cinema", "cinema", cinemaList)}
            {renderAddPicker(
              "Cinema Location",
              "cinemaLocation",
              cinemaLocationList,
            )}
          </div>

          {/* Schedule Picker */}
          {renderTimePicker()}

          {/* Submit */}
          <button
            type="button"
            onClick={handleEditSubmit}
            className="mt-4 w-full rounded-md bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
          >
            Save Movie
          </button>

          {!isValid && <span className="mt-2 text-red-500">{errorMsg}</span>}
        </div>
      </div>
    </section>
  );
};

export default AdminEditForm;
