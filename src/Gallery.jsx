import React, { useState, useEffect } from 'react';

function Gallery() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/react-tours-project')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching tours:', err);
      });
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const toggleDescription = (id) => {
    setTours(tours.map((tour) =>
      tour.id === id ? { ...tour, showDescription: !tour.showDescription } : tour
    ));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching tours: {error}</p>;
  }

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <h2>{tour.name}</h2>
          <p>{tour.price}</p>
          <p>
            {tour.showDescription ? tour.info : `${tour.info.slice(0, 100)}...`}
            <button onClick={() => toggleDescription(tour.id)}>
              {tour.showDescription ? 'Show Less' : 'Read More'}
            </button>
          </p>
          <button onClick={() => removeTour(tour.id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
}

export default Gallery;