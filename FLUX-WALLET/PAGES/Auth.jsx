import { useState } from "react";

export function AuthPage () {
  const [screen,setScreen] = useState('');

  if (screen === "login")        return <LoginScreen setScreen={setScreen} />
    if (screen === "register")     return <RegisterScreen setScreen={setScreen} />
    if (screen === "forgot-step1") return <ForgotStep1 setScreen={setScreen} />
    if (screen === "forgot-step2") return <ForgotStep2 setScreen={setScreen} />
    if (screen === "success")      return <SuccessModal setScreen={setScreen} />
    if (screen === "security-setup") return <SecuritySetup setScreen={setScreen} />
}

function LoginScreen () {
  return (
<div className="login-page">
      <div className="logo-wrapper">
        <img src="./public/IMAGES/Fluxlogo.png" alt="Flux Wallet" />
      </div>
      <div className="welcome-section">
        <h1>Welcome back 👋</h1>
        <p>Login to your account</p>
      </div>
      <div className="form-section">
        <div className="field-group">
          <label>
            <span>Username</span>
            <input placeholder="Enter your username" />
          </label>
        </div>
        <div className="field-group">
          <label>
            <span>Password</span>
            <input type="password" placeholder="Enter your password" />
          </label>
        </div>
        <p className="forgot-password">Forgot password?</p>
      </div>
      <button className="btn-login">Login</button>
      <p className="register-row">
        Don't have an account?
        <button className="btn-register">Register</button>
      </p>
      <p className="secure-footer">Secure. Simple. Seamless.</p>
    </div>
  );
}

function RegisterScreen () {
  return (
      <div className="register-page">
        <div className="logo-wrapper">
          <img src="./public/IMAGES/Fluxlogo.png" alt="Flux Wallet" />
        </div>
        <div className="create-account-section">
          <h1>Create your account</h1>
          <p>Let's get you started</p>
        </div>
        <div className="register-form">
          <div className="field-group">
            <label>
              <span>Username</span>
              <input placeholder="Choose a username" />
            </label>
          </div>
          <div className="field-group">
            <label>
              <span>Password</span>
              <input type="password" placeholder="Create a password" />
            </label>
          </div>
          <button className="btn-continue">Continue</button>
        </div>
        <p className="login-row">
          Already have an account?
          <button className="btn-login-link">Login</button>
        </p>
    </div>
  )
}




