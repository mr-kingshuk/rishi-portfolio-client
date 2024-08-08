import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Works.module.css';
import { useNavigate } from 'react-router-dom';

import Footer from '../../components/Footer/Footer.jsx';
import ProjectPreview from '../../components/ProjectPreview/ProjectPreview.jsx';

const Works = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [projDetails, setProjDetails] = useState([]);

  useEffect(() => {
    const headers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/project/allProj`);
        if (response.status === 200) {
          setProjDetails(response.data.projects);
        }
        else {
          console.log("no projects found");
        }

      } catch (error) {
        console.error('Error:', error);
        // Handle errors
      }
    }
    headers();
  }, []);

  return (
    <div className={styles.container}>
      {projDetails.length > 0 && projDetails.map((proj) =>
        <div key={proj._id} className={styles.outer} onClick={() => navigate(`/project/${proj._id}`)}>
          <ProjectPreview details={proj} />
        </div>
      )}
      <div className={`${styles.back_btn} ${styles.hoverUnderline}`} onClick={() => navigate('/')}>Back</div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Works;