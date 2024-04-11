import React, { useState, useEffect } from 'react';
import styles from './UserNavbar.module.css';

import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimateHeight from 'react-animate-height';

const UserNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [headers, setHeaders] = useState([]);
    const [logoSrc, setLogoSrc] = useState('/logo.png');

    const handleScroll = (to) => {
        setClick(false);
        const scrollIntoViewAfterNav = () => {
            const element = document.querySelector(`#${to}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // If on a different path, navigate and then scroll with a delay
        if (location.pathname !== '/') {
            navigate('/')
            setTimeout(scrollIntoViewAfterNav, 300);
        } else {
            scrollIntoViewAfterNav(); //scroll directly into view
        }
    }

    useEffect(() => {
        const headers = async () => {
            try {
                const response = await axios.get('https://rishis-server-8l672.ondigitalocean.app/api/project/projectHeaders');
                if (response.status === 200) {
                    setHeaders(response.data.projects);
                }
                else {
                    console.log(response);
                    console.log("no projects found");
                }

            } catch (error) {
                console.error('Error:', error);
                // Handle errors
            }
        }
        headers();
    }, []);

    return (
        <div className={`${styles.container} ${click ? styles.vis : null}`}>
            <div className={styles.logo} onMouseOver={() => setLogoSrc('/logo-colour.png')} onMouseLeave={() => setLogoSrc('/logo.png')} onClick={() => navigate('/')}>
                <img src={logoSrc} alt="my-logo" />
            </div>
            <div className={`${styles.hamburger} ${click ? styles.active : null}`} onClick={() => setClick(!click)}>
                <div className={`${styles.line} ${styles.line1}`}></div>
                <div className={`${styles.line} ${styles.line2}`}></div>
                <div className={`${styles.line} ${styles.line3}`}></div>
            </div>
            <div className={`${styles.list}  ${click ? styles.visible : null}`}>
                <div className={styles.list_item}>
                    <button onClick={() => handleScroll('hero')} className={styles.hoverUnderline}>Home</button>
                </div>
                <div className={styles.list_item} >
                    <button onClick={() => handleScroll('about')} className={styles.hoverUnderline}>About</button>
                </div>
                <div className={`${styles.list_item}`}>
                    <div className={styles.option_div}>
                        <div
                            className={styles.dropdown}
                            onClick={() => setDropdown(!dropdown)}
                        >
                            <img src="/down.png" alt="down btn" style={{ transform: dropdown ? 'rotateX(180deg)' : 'rotateX(0deg)' }} />
                        </div>
                        <button onClick={() => handleScroll('work')} className={styles.hoverUnderline}>Work </button>
                    </div>
                    <AnimateHeight
                        duration={200}
                        height={dropdown ? 'auto' : 0}
                    >
                        <div className={styles.dropdown_menu}>
                            {headers.length > 0 && headers.map((header) =>
                                <div
                                    key={header._id}
                                    className={`${styles.dropdown_item} ${styles.hoverUnderline}`}
                                    onClick={() => navigate(`/project/${header._id}`)}
                                >
                                    {header.heading}
                                </div>
                            )}
                        </div>
                    </AnimateHeight>
                </div>
                <div className={styles.list_item}>
                    <button onClick={() => handleScroll('contact')} className={styles.hoverUnderline}>Contact</button>
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;