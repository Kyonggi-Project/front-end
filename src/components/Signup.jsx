import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {

  const navigate = useNavigate();

  function handleSubmit() {
    //양식 벡엔드로 전달

    navigate('/');
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div>
        <h1 className="signup-title">Create an account</h1>
        <p className="option">Choose one of the option to go</p>
        <div>
          <input type="text" placeholder="Name" className="input-box" required />
        </div>
        <div>
          <input type="text" placeholder="Nickname" className="input-box" required />
        </div>
        <div>
          <input type="email" placeholder="Email" className="input-box" required />
        </div>
        <div>
          <input type="password" placeholder="Password" className="input-box" required />
        </div>
        <p className="a-text">
          Already have an account?
          <Link to="/login"className="login-link">Login</Link>
        </p>
        <button className="button" type="submit">
          Signup
        </button>
      </div>
    </form>
  );
}

export default Signup;