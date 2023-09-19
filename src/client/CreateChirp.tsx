import * as React from "react";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom"; 
import { IonIcon } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';

interface CreateChirpProps {
  
}

const CreateChirp = (props: CreateChirpProps) => {
  const nav = useNavigate(); 

  const [formData, setFormData] = React.useState({
    userid: 7,
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
      
      
      if (res.status === 201) {
        
        Swal.fire({
          icon: "success",
          title: "Chirp Created",
          text: "Your chirp has been successfully created!",
        });

        
        nav("/");
      } else {
        
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while creating your chirp.",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create">
      <h1>Create Chirp</h1>
      <form className="create__form">
        <input
          type="text"
          name="content"
          placeholder="What is happening?"
          value={formData.content}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <button className="create__form__btn" onClick={handleClick}>
         <IonIcon icon={sendOutline} style={{ marginLeft: "3px" }} />
        </button>
      </form>
    </div>
  );
};

export default CreateChirp;
