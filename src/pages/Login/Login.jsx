import React, { useState, useRef, useEffect } from 'react';
import "./login.css"
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
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="" className="sign-in-form">
            <h2 className="title">Đăng nhập</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Tài khoản" required />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mật khẩu" required />
            </div>
            <input type="submit" value="Đăng nhập" className="btn solid" required />
          </form>

          <form action="" className="sign-up-form" onSubmit={handleSignUpSubmit}>
            <h2 className="title">Đăng ký</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Tài khoản" ref={usernameRef} required />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" ref={emailRef} required />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Mật khẩu" ref={passwordRef} required />
            </div>
            <input type="submit" value="Đăng ký" className="btn solid" required />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className={`panel left-panel ${isSignUpMode ? "sign-up-mode" : ""}`}>
          <div className="content">
            <h3>Plants Seed</h3>
            <p>Truyền cảm hứng, trồng nguồn sống mới với hạt giống chất lượng cao!</p>
            <button className="btn transparent" id="sign-up-btn" onClick={handleSignUp}>Tạo mới</button>
          </div>
        </div>

        <div className={`panel right-panel ${isSignUpMode ? "sign-up-mode" : ""}`}>
          <div className="content">
            <h3>Plants Seed</h3>
            <p>Nâng cao chất lượng cuộc sống với hạt giống chất lượng cao và độc đáo!</p>
            <button className="btn transparent" id="sign-in-btn" onClick={handleSignIn}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;