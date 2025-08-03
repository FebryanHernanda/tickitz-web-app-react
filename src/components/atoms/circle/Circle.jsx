const Circle = (props) => {
  const { name, children, color, width } = props;
  return (
    <>
      <div className={`flex flex-col items-center gap-2 ${width}`}>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-white lg:h-15 lg:w-15 ${color}`}
        >
          {children}
        </div>
        <p>{name}</p>
      </div>
    </>
  );
};

export default Circle;
