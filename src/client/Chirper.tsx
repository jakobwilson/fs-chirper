import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



interface Ichirp {
  id: number
  userid: number
  content: string 
  location: string
  _created: string
}


const ChirperApp = () => {
  const [chirps, setChirps] = useState<Ichirp[]>([]);
  
  useEffect(() => {
    async function fetchChirps() {
      try {
        const res = await fetch('/api/chirps');
        const chirps = await res.json();
        setChirps(chirps);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchChirps();
  }, []);



  return (
    <div>
      <h1>Chirp List</h1>
      
      <ul>
        {chirps.map((chirp) => (
          <li key={chirp.id}>
            <p>{chirp.content}</p>
            <Link to={`/details/${chirp.id}`}>Details</Link>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};



export default ChirperApp;