import React, { useState } from 'react';
import styles from './login.module.css';
import userApi from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import path from '../../Constant/path';

const Login = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = () => {
        setIsSignUpMode(true);
        setUsernameLogin('');
        setPasswordLogin('');
    };

    const handleSignIn = () => {
        setIsSignUpMode(false);
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: username,
            email: email,
            password: password,
            cart: [],
            historyProduct: [],
            orderProduct: []
        };

        try {
            const response = await userApi.createUser(newUser);
            console.log('Signup Successful:', response);
            if (response.success) {
                await Swal.fire({
                    icon: 'success',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: false,
                });

                setIsSignUpMode(false);
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                await Swal.fire({
                    icon: 'error',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: false,
                });
            }
        } catch (error) {
            console.error('Signup Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Đăng ký không thành công!',
                text: 'Vui lòng thử lại sau.',
            });
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        const userCredentials = {
            username: usernameLogin,
            password: passwordLogin
        };

        try {
            const response = await userApi.loginUser(userCredentials);
            console.log('Đăng nhập thành công:', response);
            localStorage.setItem('userId', response.user.id);

            await Swal.fire({
                icon: 'success',
                text: response.message,
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: false,
            });
            navigate(path.home);
            window.location.reload();
        } catch (error) {
            console.error('Login Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Đăng nhập không thành công!',
                text: 'Vui lòng kiểm tra lại thông tin đăng nhập.',
            });
        }
    };

    return (
        <div className={`${styles.container} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
            <div className={styles['forms-container']}>
                <div className={styles['signin-signup']}>
                    <form className={styles['sign-in-form']} onSubmit={handleSignInSubmit}>
                        <h2 className={styles.title}>Đăng nhập</h2>
                        <div className={styles['input-field']}>
                            <i className="fas fa-user"></i>
                            <input
                                className={`${styles['input-xxx']}`}
                                type="text"
                                placeholder="Tài khoản"
                                value={usernameLogin}
                                onChange={(e) => setUsernameLogin(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles['input-field']}>
                            <i className="fas fa-lock"></i>
                            <div className={styles['password-wrapper']}>
                                <input
                                    className={`${styles['input-xxx']} ${styles['password-input']}`}
                                    type={showPasswordLogin ? "text" : "password"}
                                    placeholder="Mật khẩu"
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                                    className={styles['toggle-password']}
                                >
                                    {showPasswordLogin ? "Ẩn" : "Hiện"}
                                </button>
                            </div>
                        </div>
                        <input type="submit" value="Đăng nhập" className={`${styles.btn} solid`} required />
                    </form>

                    <form className={styles['sign-up-form']} onSubmit={handleSignUpSubmit}>
                        <h2 className={styles.title}>Đăng ký</h2>
                        <div className={styles['input-field']}>
                            <i className="fas fa-user"></i>
                            <input
                                className={`${styles['input-xxx']}`}
                                type="text"
                                placeholder="Tài khoản"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles['input-field']}>
                            <i className="fas fa-envelope"></i>
                            <input
                                className={`${styles['input-xxx']}`}
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles['input-field']}>
                            <i className="fas fa-lock"></i>
                            <div className={styles['password-wrapper']}>
                                <input
                                    className={`${styles['input-xxx']} ${styles['password-input']}`}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles['toggle-password']}
                                >
                                    {showPassword ? "Ẩn" : "Hiện"}
                                </button>
                            </div>
                        </div>
                        <input type="submit" value="Đăng ký" className={`${styles.btn} solid`} required />
                    </form>
                </div>
            </div>
            <div className={styles['panels-container']}>
                <div className={`${styles.panel} ${styles['left-panel']} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
                    <div className={styles.content}>
                        <h3>Plants Seed</h3>
                        <p>Truyền cảm hứng, trồng nguồn sống mới với hạt giống chất lượng cao!</p>
                        <button className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn" onClick={handleSignUp}>Tạo mới</button>
                    </div>
                </div>

                <div className={`${styles.panel} ${styles['right-panel']} ${isSignUpMode ? styles['sign-up-mode'] : ''}`}>
                    <div className={styles.content}>
                        <h3>Plants Seed</h3>
                        <p>Nâng cao chất lượng cuộc sống với hạt giống chất lượng cao và độc đáo!</p>
                        <button className={`${styles.btn} ${styles.transparent}`} id="sign-in-btn" onClick={handleSignIn}>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
