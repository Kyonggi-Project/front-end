function Signup() {
  return(
    <div>
        <div>
        <h1>Create an account</h1>
        <p>Choose one of the option to go</p>
        <div>
            <input type="text" placeholder="id" className="input-field"/>
        </div>
        <div>
            <input type="email" placeholder="email" className="input-field"/>
        </div>
        <div>
            <input type="password" placeholder="password" className="input-field"/>
        </div>
        <p>Already have an account? <a href='/login'>Login</a></p>
        <button>Signup</button>
        </div>
    </div>
);
}

export default Signup;