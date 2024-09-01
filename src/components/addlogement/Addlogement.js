import React, { useState } from 'react';

function Addlogement({isModalOpen, viewModal}) {
   
   
  return (
    <div className='add__logement' >
      <button onClick={viewModal}><img src='assets/icons/plus.svg'></img></button>
    </div>
  );
}

export default Addlogement;
