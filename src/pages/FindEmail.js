import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import IndexBtn from "../components/IndexBtn";
import Circles from "../components/Circles";
import Springs from "../components/Springs";
import axios from 'axios';

const FindEmail = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  
  const handleFindEmail = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    
    const data = new URLSearchParams();
    data.append("name", name);
    data.append("nickname", nickname);
  
    axios.post("http://localhost:8080/users/email", data)
      .then(response => {
        setSuccessMessage("아이디는 " + response.data + " 입니다."); 
      })
      .catch(error => {
        setError("존재하지 않는 사용자이거나 정보가 일치하지 않습니다."); 
      });
  };

  const navigateToSignUp = () => {
    navigate("/users/signup");
  };

  const navigateToFindPw = () => {
    navigate("/users/password");
  };

  const navigateToLogin = () => {
    navigate("/users/login");
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
                className="name"
                id="name"
                name="name"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="nickname"
                id="nickname"
                name="nickname"
                type="nickname"
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <button className="loginbtn" onClick={handleFindEmail}>
              아이디찾기
            </button>
            {error && <p className="error-message">{error}</p>}
             {successMessage && <p className="success-message">{successMessage}</p>}
 
            <div className="extra-login-group">
              <btn className="findId" onClick={navigateToLogin}>
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
export default FindEmail;
