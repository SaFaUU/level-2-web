import { Dispatch, SetStateAction, createContext, useState } from "react";

type TThemeProvideProps = {
  children: React.ReactNode;
};

type TThemeContext = {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<TThemeContext>(undefined);

const ThemeProvider = ({ children }: TThemeProvideProps) => {
  const [dark, setDark] = useState(false);

  const values = {
    dark,
    setDark,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
