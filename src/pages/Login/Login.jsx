import React from 'react';
import styles from './Login.module.css';

import LoginBox from '../../components/LoginBox/LoginBox.jsx';

const Login = () => {
  return (
    <div className={styles.outer}>
      <LoginBox />
    </div>
  );
};

export default Login;