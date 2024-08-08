import React, { useState, useEffect } from 'react';
import styles from './ReorderProject.module.css';
import axios from 'axios';

import AddGeneral from '../../components/addGeneral/AddGeneral.jsx';
import MyProjects from '../../components/MyProjects/MyProjects.jsx';

const ReorderProject = ({ token }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [headers, setHeaders] = useState([]);
  const [general, setGeneral] = useState({
    brief: "",
    resume: ""
  });

  useEffect(() => {
    const headers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/project/projectHeaders`);
        if (response.status === 200) {
          setHeaders(response.data.projects);
        }
        else {
          console.log(response);
          console.log("no projects found");
        }

      } catch (error) {
        console.error('Error:', error);
        // Handle errors
      }
    };

    const general = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/general`);
        if (response.status === 200) {
          setGeneral(response.data);
        }
        else {
          console.log(response);
          console.log("no general info found");
        }

      } catch (error) {
        console.error('Error:', error);
        // Handle errors
      }
    };

    general();
    headers();
  }, []);

  return (
    <div className={styles.outer}>
      <MyProjects token={token} headers={headers} setHeaders={setHeaders}/>
      <AddGeneral token={token} general={general} setGeneral={setGeneral}/>    
    </div>
  );
};

export default ReorderProject;