import React from 'react';
import ImgComponent from './ImgComponent.jsx';
import { fileType } from '../../utilities/fileType.js';

import styles from './MediaComponent.module.css';

const MediaComponent = ({ med }) => {
    if(!med)
        return ;

    const { type, ext } = fileType(med.type);
    if (type === 'video' ) {
        return (
            <video width="320" height="240" controls className={styles.video}>
                <source src={med.url} type={med.type} />
            </video>
        );
    }
    else if (type === 'image') {
        if (ext === 'gif') {
            return (
            <div className={styles.img}>
                <img src={med.url} alt="" />
            </div>);
        }
        else {
            return (
            <div className={styles.img}>
                <ImgComponent src={med.url} hash={med.hash} />
            </div>);
        }
    }
};

export default MediaComponent;