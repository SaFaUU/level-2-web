import { useState, FormEvent } from "react";

const UseStateExampleTwo = () => {
  //   const [name, setName] = useState<string>("");
  //   const [email, setEmail] = useState<string>("");

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log({ name, email });
    console.log({ user });
  };

  return (
    <form
      className="flex gap-4 flex-col align-middle justify-center w-full h-screen items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="name"
        className="input input-bordered input-primary w-full max-w-xs"
        // onChange={(e) => setName(e.target.value)}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      ></input>
      <input
        type="text"
        name="email"
        id="email"
        className="input input-bordered input-primary w-full max-w-xs"
        // onChange={(e) => setEmail(e.target.value)}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      ></input>
      <button className="btn btn-primary max-w-xl" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UseStateExampleTwo;
