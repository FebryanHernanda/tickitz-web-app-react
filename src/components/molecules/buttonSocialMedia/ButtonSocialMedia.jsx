import facebookLogo from "/src/assets/icons/socialmedia/facebook2-icon.svg";
import googleLogo from "/src/assets/icons/socialmedia/google-icon.svg";

const ButtonSocialMedia = () => {
  return (
    <>
      <div className="flex justify-between">
        <button className="flex items-center justify-center gap-5 rounded-xl border-1 border-gray-300 p-3 shadow-md hover:bg-gray-100 lg:w-50">
          <img src={googleLogo} alt="Google Icon" className="w-10" />
          Google
        </button>
        <button className="flex items-center justify-center gap-5 rounded-xl border-1 border-gray-300 p-3 shadow-md hover:bg-gray-100 lg:w-50">
          <img src={facebookLogo} alt="Facebook Icon" className="w-10" />
          Facebook
        </button>
      </div>
    </>
  );
};

export default ButtonSocialMedia;
