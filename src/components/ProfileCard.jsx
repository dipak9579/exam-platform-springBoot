import React from 'react';
import '../styles/profileCard.css';

const ProfileCard = () => {
  const email = localStorage.getItem("email");

  return (
    <div className="profile-card">
      <img src="https://i.pravatar.cc/100" alt="Profile" className="profile-img" />
      <div className="profile-info">
        <h3>{email}</h3>
        <p>Role: Student</p>
      </div>
    </div>
  );
};

export default ProfileCard;
