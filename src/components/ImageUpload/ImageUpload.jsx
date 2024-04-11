import React, { useState, useRef } from 'react';
import styles from './ImageUpload.module.css';

const ImageUpload = ({ handleUpload, type, isHero }) => {
    const [progress, setProgress] = useState(null);
    const fileInputRef = useRef(null);

    const onSubmitHandler = () => {
        fileInputRef.current.click();
    };
    
    let text;
    if(isHero)
        text =  "Only JPEGs, PNGs and GIFs files with max size of 2 MB."
    else
        text = "Only JPEGs, PNGs, GIFs and MP4s files with max size of 2 MB."

    return (
        <div className={styles.container}>
            <input type="file" name='file' onChange={(e) => handleUpload(e, setProgress)} hidden ref={fileInputRef} />
            <div className={styles.cloud_img}>
                <img src='/upload.png' alt="cloud upload image" />
            </div>
            <div className={styles.header}>{type}</div>
            <p className={styles.upload}>Browse and Choose Files to Upload.</p>
            <p className={styles.filetype}>{text}</p>
            {progress !== null &&
                <div className={styles.progressBarWrapper}>
                    <progress id={styles.progressBar} value={progress} max="100"></progress>
                    <label className={styles.progressBarValue} htmlFor="progress-bar">{`${Math.round(progress)}%`}</label>
                </div>
            } 
            <div className={styles.btn} onClick={onSubmitHandler}>Browse Files</div>
        </div>
    );
};

export default ImageUpload;