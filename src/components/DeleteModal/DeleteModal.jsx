import React, { useEffect, useState } from 'react';
import styles from './DeleteModal.module.css';
import axios from 'axios';

import { deleteImage } from '../../utilities/deleteImage.js';

const DeleteModal = ({ deleteModal, setDeleteModal, headers, setHeaders, token }) => {
    const { _id, index } = deleteModal;
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/project/${_id}`);
                if (response.status === 200) {
                    setProject(response.data);
                }
                else {
                    console.log("invalid ID");
                }

            } catch (error) {
                console.error('Error:', error);
                //Handle errors
            }
        }
        getProject();
    }, []);

    const handleDelete = async () => {
        try {
            if (project.heroImage) {
                await deleteImage(project.heroImage.url);
            }
            await Promise.all(project.media.map(async (med) => await deleteImage(med.url)));
            
            const authorization = "Bearer " + token;
            setLoading(true);
            const response = await axios.delete(`http://localhost:3000/api/project/${_id}`, {
                headers: {
                    "Authorization": authorization, // Set authorization header with token
                },
            });

            const newMedia = [...headers];
            newMedia.splice(index, 1);
            setHeaders(newMedia);
            setDeleteModal({ value: false });
            
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            setLoading(false);
        }
    };

    return (
        <div className={styles.outer}>
            <div className={styles.modal}>
                <div
                    className={styles.cross}
                    onClick={() => setDeleteModal({ _id: null, value: false })}
                >X</div>
                <h3 className={styles.heading}>Delete Modal</h3>
                {project && <p className={styles.subHeading}>Are you sure you want to delete <span>{project.heading}</span>?</p>}
                {
                    project && project.heroImage && <div className={styles.con}>
                        <img src={project.heroImage.url} alt="" />
                    </div>
                }
                <div className={styles.btncon}>
                    <button className={styles.btn} onClick={handleDelete} disabled={loading}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;