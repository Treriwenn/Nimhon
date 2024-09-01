import React, { useState } from 'react';

import Sidemenu from "../../components/sidemenu/Sidemenu";
import Carte from "../../components/carte/Carte";
import About from "../../components/about/About";
import Header from '../../components/header/Header';
import Modaleform from '../../components/addlogement/Modaleform';
import Addlogement from '../../components/addlogement/Addlogement';
import Propertylist from '../../components/propertylist/Propertylist';

function Home() {
  const [activeComponent, setActiveComponent] = useState('home'); // État pour le composant actif
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'carte':
        return <Carte />; // Rendre le composant Carte
      case 'about':
        return <About />; // Rendre le composant About si nécessaire
      default:
        return <div><h1>Bienvenue sur la page d'accueil!</h1>
        <Propertylist /></div>; // Contenu par défaut
    }
  };

  return (

    <div className="home">
      <Header />
      <div className='mainSection'>
        <Sidemenu setActiveComponent={setActiveComponent} activeComponent={activeComponent} /> {/* Passer setActiveComponent à Sidebar */}
        <div className="main-content">
          {renderContent()} {/* Rendre le contenu basé sur l'état */}
        </div>
        <Addlogement isModalOpen={isModalOpen} viewModal={viewModal} />
        <div>
          {isModalOpen && <Modaleform onClose={viewModal} isModalOpen={isModalOpen} viewModal={viewModal} />}
        </div>
      </div>
    </div>
  );
}

export default Home;