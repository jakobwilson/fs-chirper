import React from "react";

const DeleteChirp = ({ chirpId, onDelete }) => {
  const handleDelete = () => {
   
    onDelete(chirpId);
  };

  return (
    <button onClick={handleDelete}>
      Delete Chirp
    </button>
  );
};

export default DeleteChirp;