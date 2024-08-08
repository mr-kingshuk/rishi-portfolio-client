import React, { useState } from 'react';
import styles from './AddGeneral.module.css';

import axios from 'axios';

const AddGeneral = ({ token, general, setGeneral }) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [loading, setLoading] = useState(null);
    const [message, setMessage] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        const authorization = "Bearer " + token;
        setLoading(true);
        setMessage(null);
        try {
            const response = await axios.put(`${API_BASE_URL}/api/general`, general, {
                headers: {
                    "Authorization": authorization, // Set authorization header with token
                },
            });

            setMessage(response.data.message);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //to input form data
    const handleFormInput = (e) => {
        const { name, value } = e.target;
        const newGeneral = { ...general, [name]: value };
        setGeneral(newGeneral);
    }

    return (
        <form className={styles.upload} onSubmit={submitHandler}>
            <h3>General Details</h3>
            <div className={`${styles.input} ${styles.textarea_con}`}>
                <textarea
                    type="text"
                    onChange={handleFormInput}
                    value={general.brief}
                    name="brief"
                    required
                    placeholder='Write your project breif here...'
                    id="Brief"
                    className={`${styles.text_box} ${styles.text_area}`}
                />
                <label htmlFor="brief" className={styles.header}>Brief</label>
            </div>
            <div className={styles.input}>
                <input
                    type="text"
                    onChange={handleFormInput}
                    value={general.resume}
                    name="resume"
                    required
                    id="resume"
                    className={styles.text_box}
                />
                <label htmlFor="resume" className={styles.header}>Resume</label>
            </div>
            <div className={styles.btn_div}>
                <button className={styles.btn} disabled={loading}>Add Details</button>
                {message && <div className={styles.message}>{message}</div>}
            </div> 
        </form>
    )
};

export default AddGeneral;