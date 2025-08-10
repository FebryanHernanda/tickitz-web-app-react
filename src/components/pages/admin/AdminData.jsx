import { Eye, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteMoviesData,
  editMoviesData,
} from "../../../store/slices/adminSlice";

const AdminData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataMovies } = useSelector((state) => state.admin);

  const handleDelete = (id) => {
    dispatch(deleteMoviesData(id));
  };

  const handleEditData = (id) => {
    dispatch(editMoviesData(id));
    navigate(`${id}/edit`);
  };

  return (
    <section className="bg-gray-200">
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
                {dataMovies.map((movie, idx) => (
                  <tr
                    key={movie.id}
                    className="border-b border-gray-300 text-center hover:bg-gray-50"
                  >
                    <td>{idx + 1}</td>
                    <td>
                      <div className="flex h-full w-full items-center justify-center">
                        <img
                          src={movie.thumbnail}
                          alt={movie.name}
                          className="h-10 w-20 items-center justify-center rounded object-cover"
                        />
                      </div>
                    </td>
                    <td className="cursor-pointer text-blue-600 hover:underline">
                      {movie.name}
                    </td>
                    <td className="p-5">{movie.category}</td>
                    <td className="p-5">{movie.releaseDate}</td>
                    <td className="p-5">{`${movie.durationHours} Hours ${movie.durationMinutes} Minutes`}</td>
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
                ))}
              </tbody>
            </table>
          </div>
          {/* Table Container */}

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`flex h-8 w-8 items-center justify-center rounded ${
                  page === 1
                    ? "bg-blue-600 text-white shadow-md"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                {page}
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
