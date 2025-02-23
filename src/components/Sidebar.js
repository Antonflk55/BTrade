// Sidebar.js
import React from 'react';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Menu</h2>
      <a href="#dashboard">Dashboard</a>
      <a href="#reports">Reports</a>
      <a href="#analytics">Analytics</a>
      <a href="#settings">Settings</a>
    </div>
  );
}

export default Sidebar;