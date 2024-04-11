import React from 'react';
import styles from './ProjectPreview.module.css';

import MediaComponent from '../MediaComponent/MediaComponent.jsx';

const ProjectPreview = ( { details }) => {
    if(!details) 
        return ;

    return (
        <div className={styles.container}>
            <div className={styles.img}>
                <MediaComponent med={details.heroImage}/>
            </div>
            <div className={styles.content}>
                <div className={styles.heading}>{details.heading}</div>
                <div className={styles.sub_heading}>{details.subHeading}</div>
            </div>
        </div>
    );
};

export default ProjectPreview;