import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { toast } from "react-toastify";

import { TimePicker } from "../../molecules";
import { useNavigate, useParams } from "react-router-dom";
import { editMoviesData } from "../../../store/slices/adminSlice";

const AdminEditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movieEditId } = useParams();

  const [inputTime, setInputTime] = useState(false);
  const { dataMovies } = useSelector((state) => state.admin);

  /* Get Data Item */
  const filteredData = dataMovies.find(
    (data) => data.id === Number(movieEditId),
  );

  /* Set controlled input value */
  const [movieForm, setMovieForm] = useState({
    id: filteredData.id,
    thumbnail:
      "https://lh6.googleusercontent.com/proxy/SbyqrAadZJMr0OnkeMsUBHNdWB4qiB0i4MZKRvOjyvBs6Ul-GS0U3uuQV9H787LBxoshDNR1uO1rtk5xToQ9CcU1QySX5YTIQ-vLCG5ZRe6AvT4cPv5ITUZKB70IdAM",
    name: filteredData.name,
    category: filteredData.category,
    releaseDate: filteredData.releaseDate,
    durationHours: filteredData.durationHours,
    durationMinutes: filteredData.durationMinutes,
    directorName: filteredData.directorName,
    cast: filteredData.cast,
    synopsis: filteredData.synopsis,
    location: filteredData.location,
    movieDate: filteredData.movieDate,
    showTime: filteredData.showTime,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isValid, setIsValid] = useState(true);

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
    const showTimeUpdate = movieForm.showTime.filter((_, idx) => idx !== id);

    setMovieForm((prevData) => ({
      ...prevData,
      showTime: showTimeUpdate,
    }));
  };

  /* Handle Submit */
  const handleSubmit = () => {
    if (movieForm.showTime.length === 0) {
      setErrorMsg("Mohon mengisikan waktu penayangan !");
      setIsValid(false);
      return;
    } else {
      setIsValid(true);
    }

    if (!isValid) {
      setErrorMsg("Mohon isi seluruh kolom field !");
      return;
    }

    dispatch(editMoviesData(movieForm));

    toast.success("Data Berhasil dirubah!", {
      position: "top-center",
      autoClose: 2000,
    });

    navigate("/admin/data");
  };

  /* Handle Input Times */
  const handleInputTime = (e) => {
    e.stopPropagation();
    setErrorMsg("");
    setInputTime((prev) => !prev);
  };

  return (
    <section className="bg-gray-200" onClick={() => setInputTime(false)}>
      <div className="mx-auto w-full max-w-screen-2xl p-5 lg:p-10">
        <div className="flex flex-col gap-5 rounded-lg bg-white p-5 shadow-md lg:p-10">
          <h2 className="text-lg font-semibold">Edit New Movie</h2>

          <div className="flex flex-col gap-5">
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
                defaultValue={filteredData.name}
                onChange={handleDataChange}
                placeholder={filteredData.name}
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
                defaultValue={filteredData.category}
                onChange={handleDataChange}
                placeholder={filteredData.category}
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
                  defaultValue={filteredData.releaseDate}
                  onChange={handleDataChange}
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
                    placeholder={`${filteredData.durationHours} Hours`}
                    name="durationHours"
                    defaultValue={filteredData.durationHours}
                    onChange={handleDataChange}
                    max={10}
                  />
                  <input
                    type="number"
                    className="w-1/2 rounded-md border border-gray-400 px-3 py-2 text-sm"
                    placeholder={`${filteredData.durationMinutes} Minutes`}
                    defaultValue={filteredData.durationMinutes}
                    onChange={handleDataChange}
                    max={60}
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
                defaultValue={filteredData.directorName}
                onChange={handleDataChange}
                placeholder={filteredData.directorName}
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
                defaultValue={filteredData.cast}
                onChange={handleDataChange}
                placeholder={filteredData.cast}
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
                defaultValue={filteredData.synopsis}
                onChange={handleDataChange}
                placeholder={filteredData.synopsis}
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
                defaultValue={filteredData.location}
                onChange={handleDataChange}
                placeholder={filteredData.location}
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
                  defaultValue={filteredData.movieDate}
                  onChange={handleDataChange}
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

export default AdminEditForm;
