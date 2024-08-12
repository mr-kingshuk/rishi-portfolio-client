import React, { useState, useEffect } from 'react';
import styles from './About.module.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const About = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [general, setGeneral] = useState({
    brief: "",
    resume: ""
  });

  useEffect(() => {
    const general = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/general`);
        if (response.status === 200) {
          setGeneral(response.data);
        }
        else {
          console.log(response);
        }

      } catch (error) {
        console.error('Error:', error);
      }
    };
    general();
  }, [])

  return (
    <div className={styles.outer} id="about">
      <div className={styles.image}>
        <img className={styles.figure} src="./rishi.png" alt="image" />
      </div>
      <div className={styles.details}>
        <motion.div 
          variants={{
            "initial": {
              y: -30,
              opacity: 0
            },
            "final": {
              y: 0,
              opacity: 1,
              amount: 0.5
            }
          }}
          initial="initial"
          whileInView="final"
          transition={{ duration: 0.7, ease: 'backInOut' }}
          className={styles.detail}>
          <div className={styles.heading}>Who Am I?</div>
          {general.brief && general.brief.length > 0 && <div className={styles.brief}>{general.brief}</div>}
        </motion.div>
        <div className={styles.btn}>
          <a href={general.resume} target="_blank">Resume</a>
        </div>
      </div>
    </div>
  );
};

export default About;