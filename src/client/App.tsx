import * as React from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import ChirperApp from "./Chirper";
import ChirpDetails from './ChirpDetails';
import CreateChirp from "./CreateChirp";



const App = (props: AppProps) => {
  return (
    <BrowserRouter>
    <div>
      <nav className="create__link">
        
        <Link to="/create"><div className="create__chirp__btn"><IonIcon icon={addOutline} />
          </div></Link> 
      </nav>
    </div>
      <Routes>
        <Route path="/" element={<ChirperApp />} />
        <Route path="/details/:id" element={<ChirpDetails/>} />
        <Route path="/create" element={<CreateChirp/>} />
        <Route path="/delete/:id" element={<DeleteChirpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const DeleteChirpPage = () => {
  const { id } = useParams();
  const handleDeleteChirp = () => {
    console.log(`Deleting Chirp with ID ${id}`);
  };
  return (
    <div>
      <h2>Delete Chirp</h2>
      <button onClick={handleDeleteChirp}>Confirm Deletion</button>
    </div>
  );
};

interface AppProps {}


export default App;
