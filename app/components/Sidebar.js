// app/components/Sidebar.js
'use client';
import React, { useState, useEffect } from 'react';
import { FaRedditAlien } from "react-icons/fa";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/Sidebar.module.css';

const Sidebar = () => {
  const pathname = usePathname();
  const [activeIcon, setActiveIcon] = useState('');
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  // Update active icon based on current route when component mounts or route changes
  useEffect(() => {
    if (pathname === '/RedditResearch') {
      setActiveIcon('RedditResearch');
    }
  }, [pathname]);
  
  // Menu items with their corresponding routes
  const menuItems = [
    { id: 'RedditResearch', icon: <FaRedditAlien size={22} />, name: 'Reddit Research', route: '/RedditResearch' },
  ];

  const renderMenuItem = (item) => (
    <div key={item.id} className={styles.linkContainer}>
      <Link href={item.route} className={styles.navLink}>
        <button
          className={`${styles.iconButton} ${activeIcon === item.id ? styles.active : ''}`}
          onMouseEnter={() => setHoveredIcon(item.id)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          {item.icon}
          {hoveredIcon === item.id && (
            <span className={styles.tooltip}>{item.name}</span>
          )}
        </button>
      </Link>
    </div>
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.menuIcons}>
          {menuItems.map(renderMenuItem)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;