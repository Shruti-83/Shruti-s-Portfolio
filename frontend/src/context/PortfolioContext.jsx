import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const PortfolioContext = createContext(null);
const API = import.meta.env.VITE_BACKEND_URL || '';

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/api/portfolio`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error('Failed to load portfolio data:', err);
        // Fallback data so UI doesn't break without backend
        setData({
          hero: { name: 'YOUR NAME', tagline: 'YOUR TAGLINE', subTagline: 'Your Role', ctaText: 'Explore My Work', resumeLink: '#' },
          about: { title: 'About Me', description: 'Your description here.', description2: '', image: '/assets/profile.jpg', stats: [] },
          skills: [],
          projects: [],
          experience: [],
          education: [],
          contact: { email: 'you@example.com',  location: '', github: '#', linkedin: '#', twitter: '#', instagram: '#' },
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);