import React from "react";

const useUserData = () => {
  const [userData, setUserData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const controller = new AbortController();

  const getUsers = async () => {
    setLoading(true);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
      {
        signal: controller.signal,
      }
    );
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return { userData, loading, error };
};

export default useUserData;
