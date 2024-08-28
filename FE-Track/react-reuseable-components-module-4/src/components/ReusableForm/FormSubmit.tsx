import React from "react";
import cn from "../../utils/cn";
import Button from "../ui/Button";
import { FormElementContext } from ".";

export const FormSubmit = () => {
  const { double } = React.useContext(FormElementContext);

  return (
    <div
      className={cn(
        "w-full grid grid-cols-1 gap-5 justify-items-center max-w-md"
      )}
    >
      <div className="w-full col-start-1 md:col-start-2 flex justify-end">
        <Button className="w-full md:w-fit" type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};
