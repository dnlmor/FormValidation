import React, { useState, useEffect } from 'react';
import { getProfileSubmissions } from '../services/api';

const Submissions = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getProfileSubmissions();
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div>
      <h1>Submitted Profiles</h1>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Birth</th>
            <th>Favorite Number</th>
            <th>Favorite Mammal</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile._id}>
              <td>{profile.fullName}</td>
              <td>{profile.email}</td>
              <td>{profile.phone}</td>
              <td>{profile.dateOfBirth}</td>
              <td>{profile.favoriteNumber}</td>
              <td>{profile.favoriteMammal}</td>
              <td>{profile.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submissions;
