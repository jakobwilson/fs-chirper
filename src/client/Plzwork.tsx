import * as React from "react";

interface AddChirpProps {}

const AddChirp = (props: AddChirpProps) => {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("/api/chirps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: 9, content: "Hi", location: "Alabama" }),
    });
    const msg = await res.json()
    console.log(msg)
  };
  return (
    <div>
      <form>
        <input />
        <textarea />
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
};

export default AddChirp;
