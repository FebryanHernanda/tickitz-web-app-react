const ButtonSocialMedia = () => {
  return (
    <>
      <div className="flex justify-between">
        <button className="flex gap-5 items-center p-3 hover:bg-gray-100 rounded-2xl">
          <img
            src="/src/assets/icons/socialmedia/google-icon.svg"
            alt="Google Icon"
            className="w-10"
          />
          Google
        </button>
        <button className="flex gap-5 items-center p-3 hover:bg-gray-100 rounded-2xl">
          <img
            src="/src/assets/icons/socialmedia/facebook2-icon.svg"
            alt="Facebook Icon"
            className="w-10"
          />
          Facebook
        </button>
      </div>
    </>
  );
};

export default ButtonSocialMedia;
