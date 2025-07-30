import { MyInput } from "../../atoms";

const InputField = (props) => {
  const { label, htmlFor } = props;

  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <MyInput {...props} />
    </>
  );
};

export default InputField;
