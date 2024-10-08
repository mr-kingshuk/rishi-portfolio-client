import React, { useState, useEffect} from 'react';
import axios from 'axios';
import styles from './Project.module.css';
import { useNavigate, useParams } from 'react-router-dom';

import ProjectDisplay from '../../components/ProjectDisplay/ProjectDisplay.jsx'

const Project = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/project/${id}`);
        if (response.status === 200) {
          setData(response.data);
        }
        else{
          console.log("invalid ID");
          navigate('/');
        }

      } catch (error) {
        console.error('Error:', error);
        navigate('/');
        //Handle errors
      }
    }
    getProject();
  }, [id]);

  return (
    <div className={styles.container}>
      {Object.keys(data).length !== 0 && <ProjectDisplay data={data}/>}
    </div>
  );
};

export default Project;