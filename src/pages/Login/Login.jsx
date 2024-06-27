import React, { useState, useRef, useEffect } from 'react';
import styles from "./login.module.css"
import "./login.module.css"
const Login = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUp = () => {
    setIsSignUpMode(true);
  };

  const handleSignIn = () => {
    setIsSignUpMode(false);
  };

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    // Tạo file user.json nếu chưa tồn tại
    fetch('/user.json', { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          // File user.json chưa tồn tại, tạo mới
          return fetch('/user.json', { method: 'PUT' });
        }
      })
      .catch(error => {
        console.error('Lỗi khi kiểm tra file user.json:', error);
      });
  }, []);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    console.log(newUser);
    
  }

  return (
    <div className={`${styles['container']} ${isSignUpMode ? styles['sign-up-mode'] : ""}`}>
      <div className={`${styles['forms-container']}`}>
        <div className={`${styles['signin-signup']}`}>
          <form action="" className={`${styles["sign-in-form"]}`}>
            <h2 className={`${styles.title}`}>Đăng nhập</h2>
            <div className={`${styles["input-field"]}`}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Tài khoản" required />
            </div>
            <div className={`${styles["input-field"]}`}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mật khẩu" required />
            </div>
            <input type="submit" value="Đăng nhập" className={`${styles.btn} solid`} required />
          </form>

          <form action="" className={`${styles["sign-up-form"]}`} onSubmit={handleSignUpSubmit}>
            <h2 className={`${styles.title}`}>Đăng ký</h2>
            <div className={`${styles["input-field"]}`}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Tài khoản" ref={usernameRef} required />
            </div>
            <div className={`${styles["input-field"]}`}>
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" ref={emailRef} required />
            </div>
            <div className={`${styles["input-field"]}`}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mật khẩu" ref={passwordRef} required />
            </div>
            <input type="submit" value="Đăng ký" className={`${styles.btn} solid`} required />
          </form>
        </div>
      </div>
      <div className={`${styles["panels-container"]}`}>
        <div className={`${styles['panel']} ${styles['left-panel']} ${isSignUpMode ? `${styles["sign-up-mode"]}` : ""}`}>
          <div className={styles.content}>
            <h3>Plants Seed</h3>
            <p>Truyền cảm hứng, trồng nguồn sống mới với hạt giống chất lượng cao!</p>
            <button className={`${styles.btn} ${styles.transparent} `} id="sign-up-btn" onClick={handleSignUp}>Tạo mới</button>
          </div>
        </div>

        <div className={`${styles['panel']} ${styles['right-panel']} ${isSignUpMode ? `${styles["sign-up-mode"]}` : ""}`}>
          <div className={styles.content}>
            <h3>Plants Seed</h3>
            <p>Nâng cao chất lượng cuộc sống với hạt giống chất lượng cao và độc đáo!</p>
            <button className={`${styles.btn} ${styles.transparent} `} id="sign-in-btn" onClick={handleSignIn}>Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;