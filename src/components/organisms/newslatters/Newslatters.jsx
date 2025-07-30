const NewstLatters = () => {
  return (
    <section className="">
      <div className="bg-blue-600 flex flex-col gap-10 justify-center rounded-2xl px-5 py-20 lg:px-15 relative overflow-hidden ">
        <h1 className="text-4xl text-center font-regular text-white">
          Subscribe to our newsletter
        </h1>
        <form className=" flex gap-5 flex-col lg:flex-row justify-center items-center">
          <div className="flex gap-5 w-full lg:w-200">
            <input
              className="bg-white rounded-md p-2 w-full outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
            />
            <input
              className="bg-white rounded-md p-2 w-full outline-none "
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
            />
          </div>
          <button
            className="bg-white p-2 rounded-md text-blue-600 font-bold w-full lg:w-50 "
            type="submit"
          >
            Subscribe
          </button>
        </form>
        <img
          src="/src/assets/icons/circle.svg"
          alt="background circle"
          className="w-25 lg:w-40 absolute right-0 bottom-0"
        />
      </div>
    </section>
  );
};

export default NewstLatters;
