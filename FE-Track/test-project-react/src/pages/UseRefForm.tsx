import React from "react";
import CustomInput from "../components/CustomInput";

const UseRefForm = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <h1>UseRefForm</h1>
      <form>
        <CustomInput
          ref={inputRef}
          className={"input input-bordered input-primary w-full max-w-xs"}
        />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UseRefForm;
