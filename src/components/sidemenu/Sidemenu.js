import React from "react";


function Sidemenu({ setActiveComponent, activeComponent }) { // Recevoir la fonction setActiveComponent en prop
    return (
        <div className="sidemenu">
        <div
          className={activeComponent === 'home' ? 'active' : ''}
          onClick={() => setActiveComponent('home')}
        >
          <img src="/assets/icons/map-pin.svg" alt="Map Pin Icon" />
          <p>Home</p>
        </div>
        <div
          className={activeComponent === 'carte' ? 'active' : ''}
          onClick={() => setActiveComponent('carte')}
        >
          <p>Carte</p>
        </div>
        <div
          className={activeComponent === 'about' ? 'active' : ''}
          onClick={() => setActiveComponent('about')}
        >
          <p>About</p>
        </div>
      </div>
    );
  }

export default Sidemenu;
