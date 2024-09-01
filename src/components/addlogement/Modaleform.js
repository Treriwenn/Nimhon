import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Modaleform = ({ viewModal }) => {
  const [name, setName] = useState('');
  const [addresse, setAddresse] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async (query) => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      setLoading(true);

      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: query,
            format: 'json',
            limit: 10
          }
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleInputChange = (event) => {
      const value = event.target.value;
      setQuery(value);
      fetchSuggestions(value);
    };

    if (inputRef.current) {
      inputRef.current.addEventListener('input', handleInputChange);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('input', handleInputChange);
      }
    };
  }, []); // Exécuter une seule fois après le montage

  const handleSuggestionClick = async (suggestion) => {
    const { lat, lon } = suggestion;
    setQuery(suggestion.display_name);
    setAddresse(suggestion.display_name);
    setCoordinates({ lat, lon });
    setSuggestions([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/properties', {
        name,
        addresse,
        price,
        size,
        coordinates,
      });

      setMessage(`Property added successfully: ${response.data.name}`);
    } catch (error) {
      setMessage(`Error adding property: ${error.message}`);
    }
  };

  return (
    <div className='modale__new__logement'>
      <img onClick={viewModal} className='modale__new__logement__arrow' src='assets/icons/arrow-email-forward.svg' alt='Close Modal' />
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Adresse:</label>
          <input
            type="text"
            ref={inputRef}
            placeholder="Entrez une adresse"
            value={query} // Utilisez query comme la seule source de vérité pour la valeur de l'input
            onChange={(e) => {
              setQuery(e.target.value); // Mettre à jour query
              setAddresse(e.target.value); // Mettre à jour addresse pour la soumission
            }}
          />
          {loading && <p>Chargement...</p>}
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)} // Utiliser une fonction fléchée pour passer l'argument correctement
                style={{ cursor: 'pointer' }} // Style pour indiquer que c'est cliquable
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Size:</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Property</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Modaleform;
