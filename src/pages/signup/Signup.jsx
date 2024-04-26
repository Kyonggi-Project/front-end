
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {

  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL_PATH;

  function handleSubmit(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    // 폼 데이터 수집
    const formData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      nickname: event.target.elements.nickname.value,
    };

    const confirm = event.target.elements.confirm_password.value;
    if (formData.password !== confirm) {
      alert("비밀번호를 확인해 주세요");
    } else {
      console.log(formData);

      // axios를 사용하여 POST 요청 보내기
      axios.post(/*백엔드 요청 주소*/url + '/api/user/signup', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log('응답 데이터:', response.data);
          alert("회원가입 되었습니다.");
          navigate('/login');
        })
        .catch(error => {
          alert("아이디, 비밀번호 혹은 이메일을 확인해주세요.");
          console.error('데이터 전송 오류:', error);
        });
    }

  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div>
        <h1 className="signup-title">Create an account</h1>
        <p className="signup-option">Choose one of the option to go</p>
        <div>
          <input type="text" placeholder="Nickname" className="signup-input-box" required name="nickname" />
        </div>
        <div>
          <input type="email" placeholder="Email" className="signup-input-box" required name="email" />
        </div>
        <div>
          <input type="password" placeholder="Password" className="signup-input-box" required name="password" />
        </div>
        <div>
          <input type="password" placeholder="Confirm Password" className="signup-input-box" required name="confirm_password" />
        </div>
        <p className="a-text">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
        <button className="signup-button" type="submit">
          Signup
        </button>
      </div>
    </form>
  );
}

export default Signup;
