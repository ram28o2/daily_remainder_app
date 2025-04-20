import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // use logout from context

  const handleLogout = () => {
    logout();              // clear token & update auth state
    navigate("/login");    // redirect
  };

  return (
    <aside style={styles.navbar}>
      <div style={styles.logo}>MyApp</div>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}><Link to="/home" style={styles.link}>Home</Link></li>
          <li style={styles.navItem}><Link to="/profile" style={styles.link}>Profile</Link></li>
          <li style={styles.navItem}><Link to="/todo" style={styles.link}>To-Do List</Link></li>
          <li style={styles.navItem}><Link to="/daily" style={styles.link}>Daily Tasks</Link></li>
          <li style={styles.navItem}><Link to="/notes" style={styles.link}>Notes</Link></li>
          <li style={styles.navItem}>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const styles = {
  navbar: {
    width: '220px',
    backgroundColor: '#1f2937',
    color: '#fff',
    paddingTop: '30px',
    position: 'fixed',
    height: '100vh',
    overflow: 'auto',
    boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
  },
  logo: {
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#f9fafb',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    padding: '15px 20px',
    transition: 'background-color 0.3s',
  },
  link: {
    color: '#f9fafb',
    textDecoration: 'none',
    display: 'block',
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#f87171',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
  },
};

export default Navbar;
