import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { ellipsisHorizontalOutline } from 'ionicons/icons';



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
    <div className='main'>
      <h1 className='list__title'>Chirp List</h1>
      
      <ul className='main__list'>
        {chirps.map((chirp) => (
          <li key={chirp.id}>
            <p className='chirp_content'>{chirp.content}</p>
            
            <span>
              <div className='details__link'>
              <Link to={`/details/${chirp.id}`}><IonIcon icon={ellipsisHorizontalOutline} className='details__icon' /></Link>
              
              </div>
            

            </span>
            
          </li>
        ))}
      </ul>
      
    </div>
  );
};



export default ChirperApp;