import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser,getStorage,SetStorage,loginUser,resetPassword,formatUsername } from "../CONTEXT/UserStorage";
import { useApp } from "../CONTEXT/AppContext";
import { normalizeAnswer , findUserByUsername } from "../CONTEXT/UserStorage";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";


export function AuthPage () {
  const {screen,currentUser} = useApp()
  const navigate = useNavigate();
  useEffect(()=>{
  if (currentUser) {
      navigate('/dashboard');
  }
  },[currentUser])
  

    if (screen === "login")        return <LoginScreen/>
    if (screen === "register")     return <RegisterScreen/>
    if (screen === "forgot-step1") return <ForgotStep1/>
    if (screen === "forgot-step2") return <ForgotStep2 />
    if (screen === "success")      return <SuccessModal/>
    if (screen === "security-setup") return <SecuritySetup/>
    if (screen === "reset-username")  return <ResetUsernameStep/>
if (screen === "reset-questions") return <ResetQuestionsStep/>
if (screen === "reset-verified")  return <ResetVerifiedStep/>
if (screen === "reset-newpass")   return <ResetNewPasswordStep/>
if (screen === "reset-success")   return <ResetSuccessStep/>
}
  function LoginScreen () {
    const {setScreen,seterror,error,loginDetails,setLoginDetails,refreshUser} = useApp();
    const navigate = useNavigate()
    return (
  <div className="login-page">
      <div className="logo-wrapper">
        <img src="/IMAGES/Fluxlogo.png" alt="Flux Wallet" />
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
              const noSpaces = e.target.value.replace(/\s/g, "");
              setLoginDetails({...loginDetails, username: formatUsername(noSpaces)})
              seterror('')
              }}/>
          </label>
        </div>
        <div className="field-group">
          <label>
            <span>Password</span>
           <input type="password" placeholder="Enter your password" value={loginDetails.password} onChange={(e)=>{
            const noSpaces = e.target.value.replace(/\s/g, "");
            setLoginDetails({...loginDetails, password: noSpaces})
            seterror('')
            }}/>
          </label>
        </div>
        <p className="forgot-password" onClick={() => setScreen('reset-username')}>Forgot password?</p>
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
        <button className="reset-back-btn" onClick={() => { seterror(''); setScreen('login'); }}>
          <ChevronLeft size={20} />
        </button>
        <div className="logo-wrapper">
          <img src="/IMAGES/Fluxlogo.png" alt="Flux Wallet" />
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
              const noSpaces = e.target.value.replace(/\s/g, "");
              setUserDetails({...userdetails, username: formatUsername(noSpaces)})
              seterror('')
              }}/>
            </label>
          </div>
          <div className="field-group">
            <label>
              <span>Password</span>
              <input type="password" placeholder="Create a password" value={userdetails.password} onChange={(e)=> {
                const noSpaces = e.target.value.replace(/\s/g, "");
                setUserDetails({...userdetails, password: noSpaces})
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
    const {setScreen, setSelectedQuestions,userdetails,setUserDetails,selectedQuestions} = useApp()
  const [selected, setSelected] = useState(selectedQuestions || []);

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
        <button className="reset-back-btn" onClick={() => setScreen('register')}>
        <ChevronLeft size={20} />
      </button>
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
      setAnswers((prev) => ({ ...prev, [q]: value }));
    };

  return (
    <div className="forgot2-page">
       <button className="reset-back-btn" onClick={() => setScreen('forgot-step1')}>
        <ChevronLeft size={20} />
      </button>

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
          const normalizedAnswers = Object.fromEntries(
            Object.entries(answers).map(([q, a]) => [q, normalizeAnswer(a)])
          );
          registerUser(userdetails.username, userdetails.password, selectedQuestions, normalizedAnswers)
          setScreen('success')
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


function ResetSessionExpired() {
  const { setScreen, setResetUsername } = useApp();
  return (
    <div className="reset-page reset-verified-page">
      <h1>Session Expired</h1>
      <p>Your password reset session was lost. Please start again.</p>
      <button
        className="btn-continue"
        onClick={() => {
          setResetUsername('');
          setScreen('reset-username');
        }}
      >
        Start Over
      </button>
    </div>
  );
}
function ResetUsernameStep() {
  const { setScreen, seterror, error, resetUsername, setResetUsername } = useApp();

  const handleContinue = () => {
    if (!resetUsername.trim()) {
      seterror("Please enter your username");
      return;
    }
    const user = findUserByUsername(resetUsername);
    if (!user) {
      seterror("No account found with that username");
      return;
    }
    seterror('');
    setScreen('reset-questions');
  };

  return (
    <div className="reset-page">
      <button className="reset-back-btn" onClick={() => { seterror(''); setScreen('login'); }}>
        <ChevronLeft size={20} />
      </button>

      <div className="reset-header">
        <h1>Reset Password</h1>
        <p>Enter your username to continue</p>
      </div>

      <div className="field-group">
        <label>
          <span>Username</span>
          <input
            placeholder="Enter your username"
            value={resetUsername}
            onChange={(e) => {
              const noSpaces = e.target.value.replace(/\s/g, "");
              setResetUsername(formatUsername(noSpaces));
              seterror('');
            }}
          />
        </label>
      </div>

      {error && <p style={{ color: 'red', fontSize: '13px', paddingBottom: '5px' }}>{error}</p>}

      <button className="btn-continue" onClick={handleContinue}>Continue</button>
    </div>
  );
}

function ResetQuestionsStep() {
  const { setScreen, seterror, error, resetUsername } = useApp();
  const user = findUserByUsername(resetUsername);

  if (!user) return <ResetSessionExpired />;

  const [answers, setAnswers] = useState(
    Object.fromEntries(user.securityQuestions.map((q) => [q, ""]))
  );

  const handleChange = (q, value) => {
    setAnswers((prev) => ({ ...prev, [q]: value }));
  };

  const handleVerify = () => {
    const correctCount = user.securityQuestions.reduce((count, q) => {
      const isCorrect = normalizeAnswer(answers[q]) === user.securityAnswers[q];
      return isCorrect ? count + 1 : count;
    }, 0);

    if (correctCount >= 2) {
      seterror('');
      setScreen('reset-verified');
    } else {
      seterror("At least 2 answers must be correct. Please try again.");
    }
  };

  const allAnswered = user.securityQuestions.every((q) => answers[q].trim() !== "");

  return (
    <div className="reset-page">
      <button className="reset-back-btn" onClick={() => { seterror(''); setScreen('reset-username'); }}>
        <ChevronLeft size={20} />
      </button>

      <div className="reset-header">
        <h1>Answer Your Security Questions</h1>
        <p>Answer at least 2 questions correctly</p>
      </div>

      <div className="forgot2-form">
        {user.securityQuestions.map((q) => (
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

      {error && <p style={{ color: 'red', fontSize: '13px', textAlign: 'center' }}>{error}</p>}

      <p className="security-selected-badge">Answer at least 2 questions correctly</p>

      <button
        className="btn-continue"
        disabled={!allAnswered}
        style={{ opacity: allAnswered ? 1 : 0.4 }}
        onClick={handleVerify}
      >
        Verify Answers
      </button>
    </div>
  );
}

function ResetVerifiedStep() {
  const { setScreen, resetUsername } = useApp();
  const user = findUserByUsername(resetUsername);

  if (!user) return <ResetSessionExpired />;

  return (
    <div className="reset-page reset-verified-page">
      <div className="success-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#2ecc71"/>
          <path d="M6 12l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1>Verification Successful!</h1>
      <p>You can now reset your password.</p>
      <button className="btn-continue" onClick={() => setScreen('reset-newpass')}>
        Continue
      </button>
    </div>
  );
}

function ResetNewPasswordStep() {
  const { setScreen, seterror, error, resetUsername, setResetUsername } = useApp();
  const user = findUserByUsername(resetUsername);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!user) return <ResetSessionExpired />;

  const handleReset = () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      seterror("Please fill in both fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      seterror("Passwords do not match");
      return;
    }
    const success = resetPassword(resetUsername, newPassword);
    if (!success) {
      seterror("Something went wrong. Please start over.");
      return;
    }
    seterror('');
    setResetUsername(''); // clear the reset session now that it's actually complete
    setScreen('reset-success');
  };

  const handlePasswordChange = (setter) => (e) => {
    const noSpaces = e.target.value.replace(/\s/g, "");
    setter(noSpaces);
    seterror('');
  };

  return (
    <div className="reset-page reset-newpass-page">
      <div className="reset-header">
        <h1>Set New Password</h1>
        <p>Choose a strong password</p>
      </div>

      <div className="field-group">
        <label>
          <span>New Password</span>
          <div className="password-input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={handlePasswordChange(setNewPassword)}
            />
            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword((s) => !s)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </label>
      </div>

      <div className="field-group">
        <label>
          <span>Confirm Password</span>
          <div className="password-input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handlePasswordChange(setConfirmPassword)}
            />
          </div>
        </label>
      </div>

      {error && <p style={{ color: 'red', fontSize: '13px', textAlign: 'center' }}>{error}</p>}

      <button className="btn-continue" onClick={handleReset}>Reset Password</button>
      <p className="reset-cancel-link" onClick={() => { seterror(''); setResetUsername(''); setScreen('login'); }}>
        Cancel and return to login
      </p>
    </div>
  );
}

function ResetSuccessStep() {
  const { setScreen } = useApp();
  return (
    <div className="reset-page reset-verified-page">
      <div className="success-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#2ecc71"/>
          <path d="M6 12l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h1>Password Reset Successful!</h1>
      <p>You can now login with your new password.</p>
      <button className="btn-continue" onClick={() => setScreen('login')}>
        Go to Login
      </button>
    </div>
  );
}




