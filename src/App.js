import React, { useState } from 'react';
import "./styles/app.scss";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Home from './pages/home/Home'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/accueil" />} />
        <Route path="/accueil" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/logement/:id" element={<FichLogement />} />
        <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </HashRouter>
  );
};

export default App;
