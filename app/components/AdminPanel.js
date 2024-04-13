'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls

const AdminPanel = () => {
  const [data, setData] = useState({
    logo: '/default-logo.svg',
    navLinks: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/website-data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogoChange = (event) => {
    setData({ ...data, logo: event.target.value });
  };

  const handleNavLinkChange = (index, event) => {
    const updatedNavLinks = [...data.navLinks];
    updatedNavLinks[index] = { ...updatedNavLinks[index], [event.target.name]: event.target.value };
    setData({ ...data, navLinks: updatedNavLinks });
  };

  const handleNavLinkAdd = () => {
    setData({ ...data, navLinks: [...data.navLinks, { href: '', label: '' }] });
  };

  const handleNavLinkDelete = (index) => {
    const updatedNavLinks = [...data.navLinks];
    updatedNavLinks.splice(index, 1);
    setData({ ...data, navLinks: updatedNavLinks });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/api/website-data', data);
      console.log('Data updated successfully:', response.data);
      // Show success message to the user (optional)
    } catch (error) {
      console.error('Error updating data:', error);
      // Show error message to the user (optional)
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="logo">Logo URL:</label>
        <input type="text" id="logo" value={data.logo} onChange={handleLogoChange} />
        <br />
        <h3>Navigation Links</h3>
        {data.navLinks.map((link, index) => (
          <div key={index}>
            <label htmlFor={`navLinkHref-${index}`}>Link URL:</label>
            <input
              type="text"
              id={`navLinkHref-${index}`}
              name="href"
              value={link.href}
              onChange={(event) => handleNavLinkChange(index, event)}
            />
            <label htmlFor={`navLinkLabel-${index}`}>Link Label:</label>
            <input
              type="text"
              id={`navLinkLabel-${index}`}
              name="label"
              value={link.label}
              onChange={(event) => handleNavLinkChange(index, event)}
            />
            <button type="button" onClick={() => handleNavLinkDelete(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleNavLinkAdd}>
          Add Link
        </button>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AdminPanel;
