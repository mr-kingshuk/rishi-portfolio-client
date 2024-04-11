import React from 'react';
import styles from './Home.module.css';

import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import About from '../../components/About/About.jsx';
import Work from '../../components/Work/Work.jsx';
import Contact from '../../components/Contact/Contact.jsx';

const Home = () => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <About />
      <Work />
      <Contact />
    </div>
  );
};

export default Home;