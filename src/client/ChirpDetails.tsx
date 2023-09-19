import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import { buildOutline } from "ionicons/icons";
import { closeOutline } from "ionicons/icons";
import { checkmarkOutline } from "ionicons/icons";

interface Ichirp {
  id: number;
  userid: number;
  content: string;
  location: string;
  _created: string;
}

const ChirpDetails = () => {
  const nav = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const chirpId = id ? parseInt(id, 10) : null;
  const [chirp, setChirp] = useState<Ichirp | null>(null);

  useEffect(() => {
    async function fetchChirpDetails() {
      try {
        const res = await fetch(`/api/chirps/${chirpId}`);
        const chirpData = await res.json();
        if (res.ok) {
          setChirp(chirpData);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchChirpDetails();
  }, [chirpId]);

  const handleDeleteChirp = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this chirp!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (isConfirmed) {
      const deleteres = await fetch(`/api/chirps/${chirpId}`, {
        method: "DELETE",
      });

      if (deleteres.ok) {
        Swal.fire("Chirp Deleted", "", "success");
        nav("/");
      } else {
        Swal.fire(
          "Error",
          "An error occurred while deleting the chirp.",
          "error"
        );
      }
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(
    chirp ? chirp.content : ""
  );
  const [editedLocation, setEditedLocation] = useState(
    chirp ? chirp.location : ""
  );
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateChirp = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        content: editedContent,
        location: editedLocation,
      };

      const res = await fetch(`/api/chirps/${chirpId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        Swal.fire("Chirp Updated", "", "success");
        setIsEditing(false);
      } else {
        Swal.fire(
          "Error",
          "An error occurred while updating the chirp.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={isEditing ? "" : "details"}>
      {chirp ? (
        <div>
          {
            !isEditing && <div>
              <h1 className="details__title">Chirp Details</h1>
          <p>ID: {chirp.id}</p>
          <p>User ID: {chirp.userid}</p>
          <p>Content: {chirp.content}</p>
          <p>Location: {chirp.location}</p>
          <p>Created: {chirp._created}</p>
          </div>
          }
        
          {isEditing ? (
            <form className="edit__form" onSubmit={handleUpdateChirp}>
              <input
                type="text"
                name="content"
                placeholder="content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <input
                type="text"
                name="location"
                placeholder="location"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
              />
              <div className="row">
              <button className="edit__chirp__btn col" onClick={toggleEditMode}>
            
            <IonIcon icon={closeOutline} /> 
            </button>
              <button className="edit__submit_chirp__btn col" type="submit"><IonIcon icon={checkmarkOutline} /></button>
              
              </div>
            </form>
          ) : (
            <div>
              <p > {editedContent}</p>
              <p > {editedLocation}</p>
            </div>
          )}
          
           {!isEditing && 
           <div>
          <button className="edit__chirp__btn" onClick={toggleEditMode}>
            
            {!isEditing  &&  <IonIcon icon={buildOutline} />}
          </button>
             <button className="delete__chirp__btn" onClick={handleDeleteChirp}>
             <IonIcon icon={trashOutline} />
           </button>
           </div>
           }
        
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChirpDetails;
