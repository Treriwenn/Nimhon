// src/components/Propertylist.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Propertylist = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les propriétés
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties');
        setProperties(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Property List</h1>
      {properties.length === 0 ? (
        <p>No properties available.</p>
      ) : (
        <ul>
          {properties.map(property => (
            <li key={property._id}>
              <h2>{property.name}</h2>
              <p>Adresse: ${property.addresse}</p>
              <p>Price: ${property.price}</p>
              <p>Size: {property.size} m²</p>
              <p>Description: {property.description}</p>
              {property.images && property.images.length > 0 && (
                <div>
                  <h3>Images:</h3>
                  {property.images.map((image, index) => (
                    <img key={index} src={image} alt={`Property ${property.name} image ${index + 1}`} style={{ width: '100px', height: 'auto', margin: '5px' }} />
                  ))}
                </div>
              )}
              {property.documents && property.documents.length > 0 && (
                <div>
                  <h3>Documents:</h3>
                  {property.documents.map((doc, index) => (
                    <a key={index} href={doc} target="_blank" rel="noopener noreferrer">Document {index + 1}</a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Propertylist;
