import React from 'react';
import styles from './ResetPassword.module.css';

import ResetPasswordBox from '../../components/ResetPasswordBox/ResetPasswordBox.jsx';

const ResetPassword = () => {
  return (
    <div className={styles.outer}>
      <ResetPasswordBox />
    </div>
  );
};

export default ResetPassword;