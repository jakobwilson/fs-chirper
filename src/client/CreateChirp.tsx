import * as React from "react";

interface CreateChirpProps {}

const CreateChirp = (props:CreateChirpProps) => {
  const [formData, setFormData] = React.useState({
    userid: 9, 
    content: "",
    location: "", 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/chirps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const msg = await res.json();
      console.log(msg);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="content"
          placeholder="Chirp content"
          value={formData.content}
          onChange={handleChange}
        />
        <textarea
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
};

export default CreateChirp;
