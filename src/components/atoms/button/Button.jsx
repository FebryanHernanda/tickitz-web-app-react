const MyButton = (props) => {
  return (
    <>
      <button {...props} className={`${props.className}`}>
        {props.children}
      </button>
    </>
  );
};

export default MyButton;
