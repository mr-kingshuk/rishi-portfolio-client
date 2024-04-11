import React, { useState } from 'react';
import useLogin from '../../hooks/useLogin.jsx';
import styles from './LoginBox.module.css';

const LoginBox = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit')
        await login(email, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePassword = async () => {
        try{
            const response = await fetch("http://localhost:3000/api/password/forget-password", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });
            const json = await response.json();
            setMessage(json);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <form className={styles.login} onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div className={styles.input}>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    id="email"
                    required
                    className={styles.text_box}
                />
                <label htmlFor="email" className={styles.header}>Email ID</label>
            </div>
            <div className={styles.input}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    id="password"
                    required
                    className={styles.text_box}
                />
                <label htmlFor="password" className={styles.header}>Password</label>
                <img
                    src={showPassword ? './hide.png' : './show.png'}
                    alt="" onClick={togglePasswordVisibility}
                    className={styles.password} />
                <div className={styles.forget_password} onClick={handlePassword}>Forget Password?</div>
            </div>
            <button className={styles.btn} disabled={isLoading}>Login</button>
            {error && <div className={styles.error}>{error}</div>}
            {message && <div className={styles.custom}>{message.message}</div>}
        </form>
    );
};

export default LoginBox;