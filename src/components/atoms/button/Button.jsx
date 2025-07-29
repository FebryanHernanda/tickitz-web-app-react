const MyButton = (props) => {
  return (
    <>
      <button {...props} className="bg-[#1d4ed8] p-3 rounded-md text-white">
        {props.children}
      </button>
    </>
  );
};

export default MyButton;
