import React, { useState, useEffect } from 'react';
import styles from './UpdateProject.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Upload from '../../components/Upload/Upload.jsx';
import Preview from '../../components/Preview/Preview.jsx';

const UpdateProject = ({ token }) => {
    const { id } = useParams();
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
        guidedBy : [],
        thanks : "",
        hyperlinks: []
    });
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const getProject = async () => {
          try {
            const response = await axios.get(`https://rishis-server-8l672.ondigitalocean.app/api/project/${id}`);
            if (response.status === 200) {
                setMedia(response.data.media);
                const { media: usedMedia, _id, __v, updatedAt, order, createdAt, ...filterData } = response.data;
                setData(filterData);
                const footerData = {
                    thanks : response.data.thanks,
                    hyperlinks : response.data.hyperlinks,
                    guidedBy : response.data.guidedBy 
                } 
                setFooter(footerData);
            }
            else{
              console.log("invalid ID");
              navigate('/projects');
            }
    
          } catch (error) {
            console.error('Error:', error);
            //Handle errors
          }
        }
        getProject();
      }, [id]);
    

    const submitHandler = async (e) => {
        e.preventDefault();
        const authorization = "Bearer " + token;
        setLoading(true);
        try {
            const response = await axios.put(`https://rishis-server-8l672.ondigitalocean.app/api/project/${id}`, {
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
            setLoading(false);
            // Handle errors
        }
    };

    return (
        <div className={styles.outer}>
            <div style={{ overflowY: "scroll", flex: "0 0 40%" }}>
                <Upload
                    text="Update"
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

export default UpdateProject;