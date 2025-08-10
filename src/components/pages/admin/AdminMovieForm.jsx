import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { TimePicker } from "../../molecules";
import { addMoviesData } from "../../../store/slices/adminSlice";

const AdminMovieForm = () => {
  const dispatch = useDispatch();
  const [inputTime, setInputTime] = useState(false);
  const { dataMovies } = useSelector((state) => state.admin);

  const [movieForm, setMovieForm] = useState({
    thumbnail:
      "https://lh6.googleusercontent.com/proxy/SbyqrAadZJMr0OnkeMsUBHNdWB4qiB0i4MZKRvOjyvBs6Ul-GS0U3uuQV9H787LBxoshDNR1uO1rtk5xToQ9CcU1QySX5YTIQ-vLCG5ZRe6AvT4cPv5ITUZKB70IdAM",
    name: "",
    category: "",
    releaseDate: "",
    durationHours: "",
    durationMinutes: "",
    directorName: "",
    cast: "",
    synopsis: "",
    location: "",
    movieDate: "",
    showTime: [],
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(false);

  /* Handle onChange */
  const handleDataChange = (e) => {
    const { name, value } = e.target;

    setIsValid(value.length > 0);

    setMovieForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /* Handle Delete Time */
  const handleDeleteTime = (id) => {
    console.log("masuk");
    const showTimeUpdate = movieForm.showTime.filter((_, idx) => idx !== id);

    setMovieForm((prevData) => ({
      ...prevData,
      showTime: showTimeUpdate,
    }));
  };

  /* Handle Submit */
  const handleSubmit = () => {
    const newId = dataMovies.length + 1;
    if (movieForm.showTime.length === 0) {
      setErrorMsg("Mohon mengisikan waktu penayangan !");
      return;
    }

    if (!isValid) {
      setErrorMsg("Mohon isi seluruh kolom field !");
      return;
    }

    const movieData = {
      ...movieForm,
      id: newId,
    };

    dispatch(addMoviesData(movieData));

    /* Reset Form */
    setMovieForm({
      thumbnail:
        "https://lh6.googleusercontent.com/proxy/SbyqrAadZJMr0OnkeMsUBHNdWB4qiB0i4MZKRvOjyvBs6Ul-GS0U3uuQV9H787LBxoshDNR1uO1rtk5xToQ9CcU1QySX5YTIQ-vLCG5ZRe6AvT4cPv5ITUZKB70IdAM",
      name: "",
      category: "",
      releaseDate: "",
      durationHours: "",
      durationMinutes: "",
      directorName: "",
      cast: "",
      synopsis: "",
      location: "",
      movieDate: "",
      showTime: [],
    });

    toast.success("Data Berhasil ditambahkan!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleInputTime = (e) => {
    e.stopPropagation();
    setErrorMsg("");
    setInputTime((prev) => !prev);
  };

  return (
    <section className="bg-gray-200" onClick={() => setInputTime(false)}>
      <div className="mx-auto w-full max-w-screen-2xl p-5 lg:p-10">
        <div className="flex flex-col gap-5 rounded-lg bg-white p-5 shadow-md lg:p-10">
          <h2 className="text-lg font-semibold">Add New Movie</h2>

          {/* Upload Image */}
          <div className="flex flex-col gap-1">
            <p>Upload Image</p>
            <label className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded bg-blue-700 p-2 px-10 text-sm text-white">
              Upload
              <input type="file" className="hidden" />
            </label>
          </div>
          {/* Upload Image */}

          {/* Movie Name */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Movie Name</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
              name="name"
              value={movieForm.name}
              onChange={handleDataChange}
              required
            />
          </div>
          {/* Movie Name */}

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Category</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
              name="category"
              value={movieForm.category}
              onChange={handleDataChange}
              required
            />
          </div>
          {/* Category */}

          {/* Release Date */}
          <div className="flex gap-2">
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
            {/* Release Date */}

            {/* Duration */}
            <div className="flex w-full flex-col gap-2">
              <label className="mb-1 block font-medium">
                Duration (Hours & Minutes)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-1/2 rounded-md border border-gray-400 px-3 py-2 text-sm"
                  placeholder="Hours"
                  name="durationHours"
                  value={movieForm.durationHours}
                  onChange={handleDataChange}
                  max={10}
                  required
                />
                <input
                  type="number"
                  className="w-1/2 rounded-md border border-gray-400 px-3 py-2 text-sm"
                  placeholder="Minutes"
                  name="durationMinutes"
                  value={movieForm.durationMinutes}
                  onChange={handleDataChange}
                  max={60}
                  required
                />
              </div>
            </div>
          </div>
          {/* Duration */}

          {/* Director Name */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Director Name</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
              name="directorName"
              value={movieForm.directorName}
              onChange={handleDataChange}
              required
            />
          </div>
          {/* Director Name */}

          {/* Cast */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Cast</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
              name="cast"
              value={movieForm.cast}
              onChange={handleDataChange}
              required
            />
          </div>
          {/* Cast */}

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
            ></textarea>
          </div>
          {/* Synopsis */}

          {/* Add Location */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Add Location</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
              name="location"
              value={movieForm.location}
              onChange={handleDataChange}
              required
            />
          </div>
          {/* Add Location */}

          {/* Start Date & Time */}
          <div className="relative flex flex-col gap-2">
            <label className="mb-1 block font-medium">Set Date & Time</label>
            <div className="flex flex-col gap-4">
              <input
                type="date"
                className="w-1/3 rounded-md border border-gray-400 px-3 py-2 text-sm"
                name="movieDate"
                value={movieForm.movieDate}
                onChange={handleDataChange}
                required
              />
              <div className="flex items-center gap-10">
                <button
                  className="w-20 rounded-md border-1 border-gray-400 p-1 text-blue-700"
                  onClick={handleInputTime}
                >
                  +
                </button>

                <div
                  className="absolute top-35"
                  onClick={(e) => e.stopPropagation()}
                >
                  {inputTime && (
                    <TimePicker
                      isOpen={setInputTime}
                      setMovieForm={setMovieForm}
                    />
                  )}
                </div>
                <div className="flex gap-10">
                  {movieForm.showTime.length > 0 &&
                    movieForm.showTime.map((data, id) => {
                      return (
                        <span key={id} className="flex items-center gap-5">
                          <h3>{data}</h3>
                          <X size={20} onClick={() => handleDeleteTime(id)} />
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          {/* Start Date & Time */}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save Movie
          </button>
          {/* Submit Button */}
          {!isValid && (
            <span className="text-center text-red-500">{errorMsg}</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminMovieForm;
