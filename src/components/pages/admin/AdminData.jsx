import { Eye, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteMoviesData,
  getAllDataMovies,
} from "../../../store/slices/adminSlice";
import { useEffect } from "react";
import {
  getCastsMovies,
  getDirectorsMovies,
  getGenresMovies,
} from "../../../store/slices/moviesSlice";
import {
  getCinemaList,
  getCinemaLocation,
} from "../../../store/slices/cinemaSlice";
import { toast } from "react-toastify";
import { API_URL } from "../../../utils/constants";

const AdminData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataMovies, page, total_pages } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllDataMovies());
    dispatch(getGenresMovies());
    dispatch(getCastsMovies());
    dispatch(getDirectorsMovies());
    dispatch(getCinemaList());
    dispatch(getCinemaLocation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    console.log("movie id:", id);

    try {
      const resultAction = await dispatch(deleteMoviesData({ id }));

      if (deleteMoviesData.fulfilled.match(resultAction)) {
        toast.success("Movie successfully deleted!", {
          position: "top-center",
          autoClose: 1000,
        });
      } else {
        toast.error(resultAction.payload?.message || "Failed to delete movie", {
          position: "top-center",
        });
      }
      dispatch(getAllDataMovies());
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the movie", {
        position: "top-center",
      });
    }
  };

  const handleEditData = (id) => {
    navigate(`${id}/edit`);
  };

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > total_pages) return;
    dispatch(getAllDataMovies({ page: newPage }));
  };

  return (
    <section className="min-h-screen bg-gray-200">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 p-5 lg:p-10">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">List Movie</h2>
            <div className="flex items-center gap-4">
              <input
                type="month"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                defaultValue="2025-08"
              />
              <button
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                onClick={() => navigate("add-movies")}
              >
                Add Movies
              </button>
            </div>
          </div>

          {/* Table container */}
          <div className="overflow-x-auto">
            <table className="w-full text-center text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-5">No</th>
                  <th className="p-5">Thumbnail</th>
                  <th className="p-5">Movie Name</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Released Date</th>
                  <th className="p-5">Duration</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataMovies.length > 0 ? (
                  dataMovies.map((movie, idx) => (
                    <tr
                      key={movie.id}
                      className="border-b border-gray-300 text-center hover:bg-gray-50"
                    >
                      <td>{idx + 1}</td>
                      <td>
                        <div className="flex h-full w-full items-center justify-center">
                          <img
                            src={`${API_URL}/public/movies${movie.poster_path}`}
                            alt={movie.title}
                            className="h-10 w-20 items-center justify-center rounded object-cover"
                          />
                        </div>
                      </td>
                      <td className="cursor-pointer text-blue-600 hover:underline">
                        {movie.title}
                      </td>
                      <td className="p-5">{movie.genres.join(", ")}</td>
                      <td className="p-5">
                        {" "}
                        {new Date(movie.release_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </td>
                      <td className="p-5">
                        {" "}
                        {`${Math.floor(movie.duration / 60)} hours ${movie.duration % 60} minutes`}
                      </td>
                      <td className="gap-2 p-5">
                        <div className="flex justify-center gap-3">
                          <button className="rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
                            <Eye size={14} />
                          </button>
                          <button
                            className="rounded bg-indigo-500 p-2 text-white hover:bg-indigo-600"
                            onClick={() => handleEditData(movie.id)}
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                            onClick={() => handleDelete(movie.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-gray-300">
                    <td colSpan="8" className="p-5 text-center text-black">
                      There is no data to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Table Container */}

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {/* Page Numbers */}
            {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePagination(p)}
                className={`flex h-8 w-8 items-center justify-center rounded ${
                  p === page
                    ? "bg-blue-600 text-white shadow-md"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {/* Pagination */}
        </div>
      </div>
    </section>
  );
};

export default AdminData;
