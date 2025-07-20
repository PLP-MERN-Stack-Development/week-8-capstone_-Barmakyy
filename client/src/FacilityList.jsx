import React, { useEffect, useState } from 'react';
import api from './api';

const FacilityList = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/facilities');
        setFacilities(res.data);
      } catch (err) {
        setError('Failed to fetch facilities');
      }
      setLoading(false);
    };
    fetchFacilities();
  }, []);

  return (
    <div className="facility-list-container">
      <h2>Facilities</h2>
      {loading ? (
        <p>Loading facilities...</p>
      ) : error ? (
        <div className="error">{error}</div>
      ) : facilities.length === 0 ? (
        <p>No facilities found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Last Inspected</th>
            </tr>
          </thead>
          <tbody>
            {facilities.map((facility) => (
              <tr key={facility._id}>
                <td>{facility.name}</td>
                <td>{facility.type}</td>
                <td>{facility.location}</td>
                <td>{facility.status}</td>
                <td>{facility.lastInspected ? new Date(facility.lastInspected).toLocaleDateString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacilityList; 