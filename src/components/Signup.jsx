import "./Signup.css";

function Signup() {
    return (
        <div className="signup-form">
            <div>
                <h1 className="signup-title">Create an account</h1>
                <p className="option">Choose one of the option to go</p>
                <div>
                    <input type="text" placeholder="Name" className="input-box" />
                </div>
                <div>
                    <input type="text" placeholder="Nickname" className="input-box" />
                </div>
                <div>
                    <input type="email" placeholder="Email" className="input-box" />
                </div>
                <div>
                    <input type="password" placeholder="Password" className="input-box" />
                </div>
                <p className="a-text">Already have an account? <a href='/login' className="login-link">Login</a></p>
                <button className="button">Signup</button>
            </div>
        </div>
    );
}

export default Signup;