import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AddProject.module.css';

import Upload from '../../components/Upload/Upload.jsx';
import Preview from '../../components/Preview/Preview.jsx';

const AddProject = ({ token }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    "heroImage": '',
    "heading": '',
    "subHeading": "",
    "brief": "",
    "category": "",
    "author": ""
  });
  const [media, setMedia] = useState([]);
  const [footer, setFooter] = useState({
    guidedBy: [],
    thanks: "",
    hyperlinks: []
  });
  const [loading, setLoading] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const authorization = "Bearer " + token;
    setLoading(true);
    try {
      const response = await axios.post('https://rishis-server-8l672.ondigitalocean.app/api/project', {
        data,
        media,
        footer
      }, {
        headers: {
          "Authorization": authorization, // Set authorization header with token
        },
      });
      setLoading(false);
      navigate('/projects');
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  };

  return (
    <div className={styles.outer}>
      <div style={{ overflowY: "scroll", flex: "0 0 40%" }}>
        <Upload
          data={data} setData={setData}
          submit={submitHandler}
          media={media} setMedia={setMedia}
          footer={footer} setFooter={setFooter}
          loading={loading}
        />
      </div>
      <div style={{ overflowY: "scroll", flex: "0 0 60%" }}>
        <Preview
          data={data}
          media={media}
          footer={footer}
        />
      </div>
    </div>
  );
};

export default AddProject;