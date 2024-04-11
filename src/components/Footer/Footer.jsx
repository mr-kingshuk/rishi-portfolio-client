import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.first_line}>© 2023 | Designed by <a href="https://www.linkedin.com/in/rishisdesign/" target="_blank" className={styles.hoverUnderline}>Rishika Garg</a> | </div>
      <div className={styles.second_line}>Developed by <a href="https://www.linkedin.com/in/kingshuk-ghosh-14122002abc/" target="_blank" className={styles.hoverUnderline}>Kingshuk Ghosh</a></div>
    </div>
  );
};

export default Footer;