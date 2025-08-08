import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { TimePicker } from "../../molecules";

const AdminMovieForm = () => {
  const [inputTime, setInputTime] = useState(false);

  const handleInputTime = (e) => {
    e.stopPropagation();
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
          <div className="flex gap-2">
            <div className="flex w-full flex-col gap-2">
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
          <div className="relative flex flex-col gap-2">
            <label className="mb-1 block font-medium">Set Date & Time</label>
            <div className="flex flex-col gap-4">
              <input
                type="date"
                className="w-1/3 rounded-md border border-gray-400 px-3 py-2 text-sm"
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
                  {inputTime && <TimePicker isOpen={handleInputTime} />}
                </div>

                <div className="flex gap-10">
                  <h3>08:30 AM</h3>
                  <h3>13:30 PM</h3>
                  <h3>20:30 PM</h3>
                </div>
              </div>
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
