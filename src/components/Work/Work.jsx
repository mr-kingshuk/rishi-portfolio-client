import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Work.module.css';
import ProjectPreview from '../ProjectPreview/ProjectPreview.jsx';

import { motion } from 'framer-motion';
import axios from 'axios';

const Work = () => {
  const navigate = useNavigate();
  const [projDetails, setProjDetails] = useState([]);

  useEffect(() => {
    const headers = async () => {
      try {
          const response = await axios.get('http://localhost:3000/api/project/top3Proj');
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
    <div className={styles.outer} id="work">
      <div className={`${styles.heading} ${styles.mobile}`}>Projects</div>
      <div className={styles.project}>
        <motion.div
          variants={{
            "initial": {
              y: -40,
              opacity: 0
            },
            "final": {
              y: 0,
              opacity: 1,
              amount: 1
            }
          }}
          initial="initial"
          whileInView="final"
          transition={{ duration: 1, ease: 'backInOut' }}
          className={styles.box1}>
          <div className={styles.element} onClick={() => navigate(`/project/${projDetails[0]._id}`)}>
            <ProjectPreview details={projDetails[0]} />
          </div>
          <div className={styles.element} onClick={() => navigate(`/project/${projDetails[1]._id}`)}>
            <ProjectPreview details={projDetails[1]} />
          </div>
        </motion.div>
        <motion.div
          variants={{
            "initial": {
              y: -40,
              opacity: 0
            },
            "final": {
              y: 0,
              opacity: 1,
              amount: 1
            }
          }}
          initial="initial"
          whileInView="final"
          transition={{ duration: 1, ease: 'backInOut' }}
          className={styles.element}
          onClick={() => navigate(`/project/${projDetails[2]._id}`)}>
          <ProjectPreview details={projDetails[2]} />
        </motion.div>
      </div>
      <div className={styles.content}>
        <div className={`${styles.heading} ${styles.laptop}`}>Projects</div>
        <div className={`${styles.sub_heading} ${styles.hoverUnderline}`} onClick={() => navigate('/works')}>Go to all Works</div>
      </div>
    </div>
  );
};

export default Work;