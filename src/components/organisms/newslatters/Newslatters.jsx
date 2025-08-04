import circleOrnament from "/src/assets/icons/circle.svg";

const NewstLatters = () => {
  return (
    <section className="">
      <div className="relative flex flex-col justify-center gap-10 overflow-hidden rounded-2xl bg-blue-600 px-5 py-20 lg:px-15">
        <h1 className="font-regular text-center text-4xl text-white">
          Subscribe to our newsletter
        </h1>
        <form className="flex flex-col items-center justify-center gap-5 lg:flex-row">
          <div className="flex w-full gap-5 lg:w-200">
            <input
              className="w-full rounded-md bg-white p-2 outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
            />
            <input
              className="w-full rounded-md bg-white p-2 outline-none"
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
            />
          </div>
          <button
            className="w-full rounded-md bg-white p-2 font-bold text-blue-600 lg:w-50"
            type="submit"
          >
            Subscribe
          </button>
        </form>
        <img
          src={circleOrnament}
          alt="background circle"
          className="absolute right-0 bottom-0 w-25 lg:w-40"
        />
      </div>
    </section>
  );
};

export default NewstLatters;
