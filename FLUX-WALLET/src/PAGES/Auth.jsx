import { useState } from "react";
import { registerUser,getStorage,SetStorage,getCurrentUser,loginUser,logoutUser,resetPassword } from "../CONTEXT/UserStorage";
export function AuthPage () {
  const [screen,setScreen] = useState('login');
    const [selectedQuestions, setSelectedQuestions] = useState([]);
  if (screen === "login")        return <LoginScreen setScreen={setScreen} />
    if (screen === "register")     return <RegisterScreen setScreen={setScreen} />
    if (screen === "forgot-step1") return <ForgotStep1 setScreen={setScreen} setSelectedQuestions={setSelectedQuestions} selectedQuestions={selectedQuestions}/>
    if (screen === "forgot-step2") return <ForgotStep2 setScreen={setScreen}  selectedQuestions={selectedQuestions}/>
    if (screen === "success")      return <SuccessModal setScreen={setScreen} />
    if (screen === "security-setup") return <SecuritySetup setScreen={setScreen} />
}

function LoginScreen ({setScreen}) {
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
   const [userdetails,setUserDetails] = useState({username:'',password: ''})
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
              <input placeholder="Choose a username" value={userdetails.username} onChange={(e)=>{setUserDetails(e.target.value)}}/>
            </label>
          </div>
          <div className="field-group">
            <label>
              <span>Password</span>
              <input type="password" placeholder="Create a password" value={userdetails.password} onChange={(e)=> {setUserDetails(e.target.value)}} />
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

const SECURITY_QUESTIONS = [
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is your favorite movie?",
  "What is your pet's name?",
  "What is your best friend's name?",
  "What is your childhood nickname?",
  "In what city were you born?",
];

function ForgotStep1({setScreen, setSelectedQuestions}) {
  const [selected, setSelected] = useState([]);

  const toggle = (q) => {
    setSelected((prev) =>
      prev.includes(q)
        ? prev.filter((x) => x !== q)
        : prev.length < 3
        ? [...prev, q]
        : prev
    );
  };

  const allSelected = selected.length === 3;

  return (
    <div className="security-page">
      <div className="security-header">
        <h1>Select 3 Security Questions</h1>
        <p>You'll use these to recover your account</p>
      </div>

      <div className="security-list">
        {SECURITY_QUESTIONS.map((q) => {
          const checked = selected.includes(q);
          const disabled = !checked && allSelected;
          return (
            <button
              key={q}
              className={`security-item ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}`}
              onClick={() => toggle(q)}
              disabled={disabled}
            >
              <span className="security-question">{q}</span>
              <span className={`security-checkbox ${checked ? "checked" : ""}`}>
                {checked && (
                  <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {allSelected && (
        <div className="security-selected-badge">
          ✓ 3 questions selected
        </div>
      )}

      <button
        className="btn-continue"
        disabled={!allSelected}
        onClick={() => { 
           setSelectedQuestions(selected);
          setScreen("forgot-step2")
        }}
        style={{ opacity: allSelected ? 1 : 0.4, marginTop: "12px" }}
      >
        Continue
      </button>
    </div>
  );
}

function ForgotStep2({ setScreen, selectedQuestions }) {
  const [answers, setAnswers] = useState(
    Object.fromEntries(selectedQuestions.map((q) => [q, ""]))
  );

  const allAnswered = selectedQuestions.every((q) => answers[q].trim() !== "");

  const handleChange = (q, value) => {
    setAnswers((prev) => ({ ...prev, [q]: value.trim() }));
  };

  return (
    <div className="forgot2-page">
      <div className="forgot2-header">
        <h1>Set Your Security Answers</h1>
        <p>These answers help verify your identity</p>
      </div>

      <div className="forgot2-form">
        {selectedQuestions.map((q) => (
          <div key={q} className="forgot2-field">
            <label className="forgot2-question">{q}</label>
            <input
              className="forgot2-input"
              placeholder="Enter your answer"
              value={answers[q]}
              onChange={(e) => handleChange(q, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        className="btn-continue"
        disabled={!allAnswered}
        style={{ opacity: allAnswered ? 1 : 0.4 }}
        onClick={() => setScreen("success")}
      >
        Continue
      </button>
    </div>
  );
}






