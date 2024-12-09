import "../../styles/AuthForm.css";


const AuthForm = () => {

	const handleSignUp = () => {
		const container = document.getElementById('container');
		container?.classList.add("rightPanelActive");
	}

	const handleSignIn = () => {
		const container = document.getElementById('container');
		container?.classList.remove("rightPanelActive");
	}



  return (
    <div className="container" id="container">
	<div className="formContainer signUpContainer">
		<form action="#">
			<h1>Create Account</h1>
			<span>or use your email for registration</span>
			<input type="text" placeholder="Name" />
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
		</form>
	</div>
	<div className="formContainer signInContainer">
		<form action="#">
			<h1>Sign in</h1>
			<span>or use your account</span>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
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
</div>
  )
}

export default AuthForm