// pages/Profile.jsx
import React from "react";

const Profile = () => {
  // Simulated user data (replace with actual data from backend later)
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 123 456 7890",
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Profile</h2>
      <div className="card shadow-sm p-4">
        <h5 className="card-title mb-3">User Information</h5>
        <div className="row">
          {/* Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Name</label>
            <p className="form-control-plaintext">{userData.name}</p>
          </div>

          {/* Email */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Email</label>
            <p className="form-control-plaintext">{userData.email}</p>
          </div>

          {/* Phone */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Phone</label>
            <p className="form-control-plaintext">{userData.phone}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;