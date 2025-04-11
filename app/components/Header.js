// app/components/Header.js
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Header.module.css';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/logo-XG.svg"
          alt="XGaming Logo"
          width={150}
          height={40}
          priority
        />
      </div>
      
      <div className={styles.profileContainer}>
        <button 
          className={styles.profileButton}
          onClick={toggleProfileMenu}
        >
          <span className={styles.profileLetter}>B</span>
        </button>
        
        {showProfileMenu && (
          <div className={styles.profileMenu}>
            <div className={styles.menuItem}>Profile</div>
            <div className={styles.menuItem}>Settings</div>
            <div className={styles.menuDivider}></div>
            <div className={styles.menuItem}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;