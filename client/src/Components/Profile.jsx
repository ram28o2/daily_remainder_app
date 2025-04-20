import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("You are not logged in.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate("/login");
      });
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to your Profile</h1>
      {user ? (
        <>
          <h3>Hello, {user.name}</h3>
          <p>Email: {user.email}</p>
          {/* <button className="btn btn-danger mt-3" onClick={logout}>
            Logout
          </button> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
