import { UploadCloud } from "lucide-react";

const AdminMovieForm = () => {
  return (
    <section className="bg-gray-200">
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
            />
          </div>
          {/* Movie Name */}

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Category</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
            />
          </div>
          {/* Category */}

          {/* Release Date */}
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <label className="mb-1 block font-medium">Release Date</label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
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
                />
                <input
                  type="number"
                  className="w-1/2 rounded-md border border-gray-400 px-3 py-2 text-sm"
                  placeholder="Minutes"
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
            />
          </div>
          {/* Director Name */}

          {/* Cast */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Cast</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
            />
          </div>
          {/* Cast */}

          {/* Synopsis */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Synopsis</label>
            <textarea
              rows="3"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
            ></textarea>
          </div>
          {/* Synopsis */}

          {/* Add Location */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Add Location</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-400 px-3 py-2 text-sm"
            />
          </div>
          {/* Add Location */}

          {/* Start Date & Time */}
          <div className="flex flex-col gap-2">
            <label className="mb-1 block font-medium">Start Date & Time</label>
            <div className="flex gap-4">
              <input
                type="date"
                className="w-1/2 rounded-md border border-gray-400 px-3 py-2 text-sm"
              />
              <input
                type="time"
                className="w-1/2 rounded-md border border-gray-400 px-3 py-2 text-sm"
              />
            </div>
          </div>
          {/* Start Date & Time */}

          {/* Submit Button */}
          <button
            type="button"
            className="w-full rounded-md bg-blue-600 py-2 text-sm text-white hover:bg-blue-700"
          >
            Save Movie
          </button>

          {/* Submit Button */}
        </div>
      </div>
    </section>
  );
};

export default AdminMovieForm;
