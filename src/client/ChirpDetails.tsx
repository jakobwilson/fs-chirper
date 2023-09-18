import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteChirp from './DeleteChirp';
import Swal from 'sweetalert2';
// import './chirpdetails.scss'



interface Ichirp {
  id: number;
  userid: number;
  content: string;
  location: string;
  _created: string;
}

const ChirpDetails = () => {
  const nav = useNavigate()
  const handleDeleteChirp = async (chirpId) => {
    const deleteres = await fetch(`/api/chirps/${chirpId}`, {
      method: "DELETE",

    })

    if (deleteres.ok) {
      Swal.fire('Chirp Deleted')
      nav('/')}
  }
  const { id } = useParams<{ id?: string }>();
  const chirpId = id ? parseInt(id, 10): null
  const [chirp, setChirp] = useState<Ichirp | null>(null);

  useEffect(() => {
    async function fetchChirpDetails() {
      try {
        const res = await fetch(`/api/chirps/${chirpId}`);
        const chirpData = await res.json();
        if (res.ok) {setChirp(chirpData);}
      } catch (error) {
        console.error(error);
      }
    }

    fetchChirpDetails();
  }, [chirpId]);

  return (
    <div className='details'>
      <h1 className='details__title'>Chirp Details</h1>
      {chirp ? (
        <div>
          <p>ID: {chirp.id}</p>
          <p>User ID: {chirp.userid}</p>
          <p>Content: {chirp.content}</p>
          <p>Location: {chirp.location}</p>
          <p>Created: {chirp._created}</p>
          <DeleteChirp chirpId={chirp.id} onDelete={handleDeleteChirp} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChirpDetails;