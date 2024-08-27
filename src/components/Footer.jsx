import React from 'react';
import styles from '../styles/compiled/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2024 Library Manager. All rights reserved.</p>
        <ul className={styles.socialLinks}>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Twitter</a></li>
          <li><a href="#">Instagram</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
