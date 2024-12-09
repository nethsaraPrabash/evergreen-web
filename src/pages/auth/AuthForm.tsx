import "../../styles/AuthForm.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Import centralized auth instance

const AuthForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState("");

    const handleSignUp = () => {
        const container = document.getElementById('container');
        container?.classList.add("rightPanelActive");
    }

    const handleSignIn = () => {
        const container = document.getElementById('container');
        container?.classList.remove("rightPanelActive");
    }

    const signupWithUsernameAndPassword = async () => {
        if (password === confirmPassword) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                navigate("/home");
            } catch (error) {
                setNotice("Sorry, something went wrong. Please try again.");
                console.error("Signup error:", error);
            }
        } else {
            setNotice("Passwords do not match. Please try again.");
        }
    }

    const loginWithUsernameAndPassword = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            setNotice("Invalid email or password. Please try again.");
            console.error("Login error:", error);
        }
    }

    return (
        <div className="container" id="container">
            <div className="formContainer signUpContainer">
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <h1>Create Account</h1>
                    <span>or use your email for registration</span>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your Password again" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <button onClick={signupWithUsernameAndPassword}>Sign Up</button>
                </form>
            </div>
            <div className="formContainer signInContainer">
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <h1>Sign in</h1>
                    <span>or use your account</span>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <a href="#">Forgot your password?</a>
                    <button onClick={loginWithUsernameAndPassword}>Sign In</button>
                </form>
            </div>
            <div className="overlayContainer">
                <div className="overlay">
                    <div className="overlayPanel overlayLeft">
                        <h1>Prathibha Tea</h1>
                        <p>IF you have an account please Login!</p>
                        <button className="ghost" onClick={handleSignIn}>Sign In</button>
                    </div>
                    <div className="overlayPanel overlayRight">
                        <h1>Prathibha Tea</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" onClick={handleSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
            {notice && <p className="notice">{notice}</p>}
        </div>
    );
}

export default AuthForm;
