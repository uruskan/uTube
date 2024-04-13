"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls

// use client  // Mark as client-side component

const Header = () => {
  const [logo, setLogo] = useState('/default-logo.svg');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/website-data');
        setLogo(response.data.logo);
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <header>
      <img src={logo} alt="Website Logo" />
      {/* ... other header elements */}
    </header>
  );
};

export default Header;
