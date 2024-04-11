import React, { useState } from 'react';
import styles from './ResetPasswordBox.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPasswordBox = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    password: "",
    passwordAgain: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3000/api/password/reset-password/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password
        })
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }
      else {
        setIsLoading(false);
        navigate('/login');
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <h3>Reset Password</h3>
      <div className={styles.input}>
        <input
          type={showPassword2 ? 'text' : 'password'}
          onChange={(e) => setPassword({ ...password, password: e.target.value })}
          value={password.password}
          name="password"
          id="password"
          required
          className={styles.text_box}
        />
        <label htmlFor="password" className={styles.header}>Password</label>
        <img
          src={showPassword2 ? '/hide.png' : '/show.png'}
          alt="" onClick={togglePasswordVisibility2}
          className={styles.password} />
      </div>
      <div className={styles.input}>
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword({ ...password, passwordAgain: e.target.value })}
          value={password.passwordAgain}
          name="passwordAgain"
          id="passwordAgain"
          required
          className={styles.text_box}
        />
        <label htmlFor="passwordAgain" className={styles.header}>Re-Enter Password</label>
        <img
          src={showPassword ? '/hide.png' : '/show.png'}
          alt="" onClick={togglePasswordVisibility}
          className={styles.password} />
      </div>
      <button className={styles.btn} disabled={isLoading}>Reset Password</button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};

export default ResetPasswordBox;