import React, { useState, useRef } from 'react';
import styles from './Contact.module.css';
import { motion } from 'framer-motion';

import Footer from '../Footer/Footer.jsx';

const Contact = () => {
  const [isCopied, setIsCopied] = useState(false);
  const links = {
    "instagram": "https://www.instagram.com/rishisdesign/",
    "linkedin": "https://www.linkedin.com/in/rishisdesign/",
    "behance": "https://www.behance.net/rishisdesign/",
    "email": "rishisdesign227@gmail.com"
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(links.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Hide toast after 2 seconds
  };


  return (
    <div className={styles.container} id="contact">
      <motion.div
        variants={{
          "initial": {
            y: -30,
            opacity: 0
          },
          "final": {
            y: 0,
            opacity: 1,
            amount: 0.5
          }
        }}
        initial="initial"
        whileInView="final"
        transition={{ duration: 1, ease: 'backInOut' }}
        className={styles.heading}>Every Story is Interesting, <br />If Told Right...
      </motion.div>
      <motion.div
        variants={{
          "initial": {
            y: -30,
            opacity: 0
          },
          "final": {
            y: 0,
            opacity: 1,
            amount: 0.5
          }
        }}
        initial="initial"
        whileInView="final"
        transition={{ duration: 1, ease: 'backInOut' }}
        className={styles.subheading}>
        <div className={styles.brief}>I would love to hear from you, whether you simply want to connect and have a discussion or are interested in hiring me.</div>
        <div className={styles.social_link}>
          <div className={`${styles.link} ${styles.hoverUnderline}`} onClick={handleCopy}>
            <a href={`mailto:${links.email}`} target="_blank">Email</a>
          </div>
          <div className={`${styles.link} ${styles.hoverUnderline}`}>
            <a href={links.linkedin} target="_blank">LinkedIn</a>
          </div>
          <div className={`${styles.link} ${styles.hoverUnderline}`}>
            <a href={links.instagram} target="_blank">Instagram</a>
          </div>
          <div className={`${styles.link} ${styles.hoverUnderline}`}>
            <a href={links.behance} target="_blank">Behance</a>
          </div>
        </div>
      </motion.div>
      <div className={styles.footer}>
        <Footer />
      </div>
      {isCopied &&
        <motion.div
          variants={{
            "initial": {
              y: 30,
              opacity: 0
            },
            "final": {
              y: 0,
              opacity: 1,
            }
          }}
          initial="initial"
          animate="final"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={styles.toast}
        >
          Email ID Copied!
        </motion.div>}
    </div>
  );
};

export default Contact;