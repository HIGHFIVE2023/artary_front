import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import IndexBtn from "../components/IndexBtn";
import Circles from "../components/Circles";
import Springs from "../components/Springs";
import axios from 'axios';

const FindPw = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleFindPw = () => {

    setError("");

    const data = new URLSearchParams();
    data.append("email", email);

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    axios.post('http://localhost:8080/users/password', data)
      .then(() => {
        alert("임시 비밀번호를 사용자의 이메일로 발송했습니다.");
      })
      .catch((error) => {
        console.error(error);
        setError("존재하지 않는 사용자입니다.");
      });
  };

  const navigateToSignUp = () => {
    navigate("/users/signup");
  };

  const navigateToFindPw = () => {
    navigate("/users/password");
  };

  const navigateToFindEmail = () => {
    navigate("/users/email");
  };
  
  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="IndexBtnContainer">
            <IndexBtn />
          </div>
          <div className="LeftDivOveray">
            <img className="DiaryIntro" src="/img/intro.png" />
          </div>
          <div className="SpringMaker">
            <Circles style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs />
            </div>
            <Circles style={{ marginLeft: "1em" }} />
          </div>
          <div className="RightDivOveray">
            <img className="LoginIcon" src="/img/icon.png" alt="login icon" />
            <div className="input-group">
              <input
                className="id"
                id="id"
                name="id"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="loginbtn" onClick={handleFindPw}>
              비밀번호 찾기
            </button>
            {error && <p className="error-message">{error}</p>}
            <div className="extra-login-group">
              <btn className="findId" onClick={navigateToFindEmail}>
                아이디 찾기
              </btn>
              <btn className="findPwd" onClick={navigateToFindPw}>
                비밀번호 찾기
              </btn>
              <btn className="GoSignUp" onClick={navigateToSignUp}>
                회원가입
              </btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FindPw;
