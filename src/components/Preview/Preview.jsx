import React from 'react';
import styles from './Preview.module.css';

import MediaComponent from '../MediaComponent/MediaComponent';
import Footer from '../Footer/Footer.jsx';

const Preview = ({ data, media, footer }) => {

    return (
        <div className={styles.outer}>
            {data.heroImage &&
                <div className={styles.heroImage}>
                    <MediaComponent med={data.heroImage} />
                </div>
            }
            <div className={styles.content}>
                <div className={styles.heading}>{data.heading}</div>
                <div className={styles.sub_heading}>{data.subHeading}</div>
                <div className={styles.details}>
                    <div className={styles.brief}>{data.brief}</div>
                    <div className={styles.about}>
                        {data.category &&
                            <div className={styles.category}>
                                <span className={styles.title}>Category: </span>
                                <span className={styles.value}>{data.category}</span>
                            </div>
                        }
                        {data.author &&
                            <div className={styles.category}>
                                <span className={styles.title}>Designed by: </span>
                                <span className={styles.value}>{data.author}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.media_comp}>
                {media && media.map((med, index) => <MediaComponent med={med} key={index} />)}
            </div>
            <div className={styles.footer}>
                {footer.guidedBy.length > 0 &&
                    <div className={styles.cat}>
                        <span className={styles.title}>Guided By: </span>
                        <div className={styles.valuecon}>
                            {footer.guidedBy.map((guides, index) => <div key={index} className={styles.value}>{guides}</div>)}
                        </div>
                    </div>
                }
                {footer.thanks &&
                    <div className={styles.cat}>
                        <span className={styles.title}>Special Thanks: </span>
                        <span className={styles.value}>{footer.thanks}</span>
                    </div>
                }
                {footer.hyperlinks.length > 0 &&
                    <div className={styles.cat}>
                        <span className={styles.title}>External Links: </span>
                        <div className={styles.valuecon}>
                            {footer.hyperlinks.map((link, index) => <a key={index} href={link.url} target="_blank" className={styles.value}>{link.text}</a>)}
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    );
};

export default Preview;