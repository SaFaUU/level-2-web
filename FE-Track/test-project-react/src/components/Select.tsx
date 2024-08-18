import React from "react";

const SelectContext = React.createContext(null);

const Select = ({ children }) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  return (
    <SelectContext.Provider value={{ selectedOption, setSelectedOption }}>
      <select onChange={(e) => setSelectedOption(e.target.value)}>
        {children}
      </select>
    </SelectContext.Provider>
  );
};

const SelectionOption = ({ value, children }) => {
  const { selectedOption, setSelectedOption } = useSelectContext();
  const isActive = selectedOption === value;

  return (
    <option value={value} className={`${isActive ? "bg-purple-600" : ""}`}>
      {children}
    </option>
  );
};

Select.SelectionOption = SelectionOption;

export default Select;

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (context === undefined) {
    throw new Error("useSelect must be used within a SelectProvider");
  }
  return context;
};
