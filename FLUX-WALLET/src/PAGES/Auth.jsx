import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser,getStorage,SetStorage,loginUser,resetPassword,formatUsername } from "../CONTEXT/UserStorage";
import { useApp } from "../CONTEXT/AppContext";
export function AuthPage () {
  const {screen} = useApp()
    if (screen === "login")        return <LoginScreen/>
    if (screen === "register")     return <RegisterScreen/>
    if (screen === "forgot-step1") return <ForgotStep1/>
    if (screen === "forgot-step2") return <ForgotStep2 />
    if (screen === "success")      return <SuccessModal/>
    if (screen === "security-setup") return <SecuritySetup/>
}
  function LoginScreen () {
    const {setScreen,seterror,error,loginDetails,setLoginDetails,refreshUser} = useApp();
    const navigate = useNavigate()
    return (
  <div className="login-page">
      <div className="logo-wrapper">
        <img src="./public/IMAGES/Fluxlogo.png" alt="Flux Wallet" />
      </div>
      <div className="welcome-section">
        <h1>Welcome back</h1>
        <p>Login to your account</p>
      </div>
      <div className="form-section">
        <div className="field-group">
          <label>
            <span>Username</span>
            <input placeholder="Enter your username" value={loginDetails.username} onChange={(e)=>{
              setLoginDetails({...loginDetails, username: formatUsername(e.target.value)})
              seterror('')
              }}/>
          </label>
        </div>
        <div className="field-group">
          <label>
            <span>Password</span>
            <input type="password" placeholder="Enter your password" value={loginDetails.password} onChange={(e)=>{
              setLoginDetails({...loginDetails, password: e.target.value})
              seterror('')
              }}/>
          </label>
        </div>
        <p className="forgot-password">Forgot password?</p>
      </div>
      {error && <p style={{ color: 'red', fontSize: '13px',paddingBottom: '5px'  }}>{error}</p>}
      <button className="btn-login" onClick={()=> {
         if (!loginDetails.username.trim() || !loginDetails.password.trim()) {
          seterror("Please fill in all fields");
          return;
        }
        const result = loginUser(loginDetails.username,loginDetails.password)
        if (result.success) {
          refreshUser()
          navigate('/dashboard')
      
        } else {
          seterror(result.error)
        }
      }}>Login</button>
      <p className="register-row">
        Don't have an account?
        <button className="btn-register" onClick={()=> {
         seterror('')
         setScreen('register')
          }}>Register</button>
      </p>
      <p className="secure-footer">Secure. Simple. Seamless.</p>
    </div>
  );
}

function RegisterScreen () {
  const {userdetails,error,setUserDetails,seterror,setScreen} = useApp()
const FluxData= getStorage();
const Users = FluxData.users;
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
              <input type="text" placeholder="Choose a username" value={userdetails.username} onChange={(e) => {
                setUserDetails({...userdetails, username: formatUsername(e.target.value)})
                seterror('')
                }}/>
            </label>
          </div>
          <div className="field-group">
            <label>
              <span>Password</span>
              <input type="password" placeholder="Create a password" value={userdetails.password} onChange={(e)=> {
                setUserDetails({...userdetails,password: e.target.value})
              seterror('')
              }} />
            </label>
          </div>
            {error && <p style={{ color: 'red', fontSize: '13px', textAlign: 'center'}}>{error}</p>}
          <button className="btn-continue" onClick={()=> {
              if (Users[formatUsername(userdetails.username)]) {
                 seterror("Username already taken! Choose another.");
                return;
              }
              if (!userdetails.username.trim() || !userdetails.password.trim()) {
                seterror("Please fill in all fields");
                return;
              }
            seterror('')
            setScreen('forgot-step1')
            }}>Continue</button>
        </div>
        <p className="login-row">
          Already have an account?
          <button className="btn-login-link" onClick={()=> {
            seterror('')
            setScreen('login')
            }}>Login</button>
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

function ForgotStep1() {
  const [selected, setSelected] = useState([]);
  const {setScreen, setSelectedQuestions,userdetails,setUserDetails} = useApp()
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

function ForgotStep2() {
  const { setScreen, selectedQuestions,userdetails,setUserDetails} = useApp()
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
        onClick={() => {
            registerUser(userdetails.username,userdetails.password,selectedQuestions,answers)
            setScreen('success')
            console.log(getStorage())

        }}
      >
        Continue
      </button>
    </div>
  );
}

function SuccessModal() {
  const {setScreen} = useApp()
  return (
    <div className="success-page">
      <div className="success-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#2ecc71"/>
          <path d="M6 12l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1>Account Created Successfully! </h1>
      <p>You can now login to your account.</p>
      <button className="btn-continue" onClick={() => setScreen("login")}>
        Go to Login
      </button>
    </div>
  );
}





