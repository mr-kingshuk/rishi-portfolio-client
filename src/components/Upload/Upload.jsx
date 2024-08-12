import React, { useState } from 'react';
import styles from './Upload.module.css';

import { uploadImage } from '../../utilities/uploadImage.js';
import { deleteImage } from '../../utilities/deleteImage.js';
import { encodeImageToBlurhash } from '../../utilities/blurhash.js';
import { fileType } from '../../utilities/fileType.js';

import ImageUpload from '../ImageUpload/ImageUpload.jsx';
import Media from '../Media/Media.jsx';
import FooterUpload from '../FooterUpload/FooterUpload.jsx';

const Upload = ({ text, data, setData, submit, media, setMedia, footer, setFooter, loading }) => {
    const isHero = true;
    const headerText = text || "Upload";

    //handles upload of HeroImage
    const handleHeroImage = async (e, setProgress) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        if (data.heroImage !== '') {
            try {
                await deleteImage(data.heroImage.url);
            } catch (err) {
                console.log(err.message);
            }
        }
        try {
            const { type, ext } = fileType(file.type);
            let newMedia = { type: file.type };
            const downloadUrl = await uploadImage(file, setProgress, isHero);
            newMedia = { ...newMedia, url: downloadUrl };
            if (type === 'image' && ext !== 'gif') {
                const hash = await encodeImageToBlurhash(file);
                newMedia = { ...newMedia, hash: hash };
            }
            setData({ ...data, heroImage: newMedia });
        } catch (error) {
            console.error(error.message);
        }
    };

    //to input form data
    const handleFormInput = (e) => {
        const { name, value } = e.target;
        const newData = { ...data, [name]: value };
        setData(newData);
    }

    return (
        <form className={styles.upload} onSubmit={submit}>
            <h3>{headerText} Project</h3>
            <ImageUpload handleUpload={handleHeroImage} isHero={isHero} type="Hero Image" />
            <div className={styles.input}>
                <input
                    type="text"
                    onChange={handleFormInput}
                    value={data.heading}
                    name="heading"
                    id="heading"
                    required
                    className={styles.text_box}
                />
                <label htmlFor="heading" className={styles.header}>Heading</label>
            </div>
            <div className={styles.input}>
                <input
                    type="text"
                    onChange={handleFormInput}
                    value={data.subHeading}
                    name="subHeading"
                    id="subHeading"
                    required
                    className={styles.text_box}
                />
                <label htmlFor="subHeading" className={styles.header}>Sub-Heading</label>
            </div>
            <div className={`${styles.input} ${styles.textarea_con}`}>
                <textarea
                    type="text"
                    onChange={handleFormInput}
                    value={data.brief}
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
                    value={data.category}
                    name="category"
                    required
                    id="category"
                    className={styles.text_box}
                />
                <label htmlFor="category" className={styles.header}>Category</label>
            </div>
            <div className={styles.input}>
                <input
                    type="text"
                    onChange={handleFormInput}
                    value={data.author}
                    name="author"
                    required
                    id="author"
                    className={styles.text_box}
                />
                <label htmlFor="author" className={styles.header}>Designed By</label>
            </div>
            <Media media={media} setMedia={setMedia} />
            <FooterUpload footer={footer} setFooter={setFooter}/>
            <button className={styles.btn} disabled={loading}>{headerText} Project</button>
        </form>
    );

};

export default Upload;