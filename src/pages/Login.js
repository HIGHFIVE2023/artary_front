import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { login } from "../service/ApiService";
import IndexBtn from "../components/IndexBtn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); //새로고침 방지
    // 로그인 요청을 보내는 함수
    axios
      .post("http://localhost:8080/users/login", { email, password })

  const handleLogin = () => {
    const userDto = {
      email: email,
      password: password, 
    };

    login(userDto)

      .then((response) => {
        console.log(response); // 응답 데이터 확인
        // 로그인 성공 후 필요한 작업 수행
        localStorage.setItem("user", JSON.stringify(response));
        window.location.href = "/"; // 로그인 후 리다이렉트할 경로 설정
      })
      .catch((error) => {
        console.error(error); // 에러 응답 데이터 확인
        setError("이메일 또는 비밀번호가 틀렸습니다."); // 에러 메시지 설정
      });
  };

  return (
    <div className="Diary">
      <div className="DiaryFrame">
        <div className="DiaryImageContainer">
          <img
            className="DiaryImage"
            src="/img/diary.png"
            alt="diary background"
          />
          <div className="IndexBtnContainer">
            <IndexBtn />
          </div>
        </div>
        <div className="LeftDivOveray"></div>
        <div className="RightDivOveray">
          <img className="LoginIcon" src="/img/icon.png" alt="login icon" />
          <div className="input-group">
            <input
              className="id"
              id="id"
              name="id"
              placeholder="아이디를 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="pwd"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="loginbtn" onClick={handleLogin}>
            로그인
          </button>
          {error && <p className="error-message">{error}</p>}
          <div className="extra-login-group">
            <btn className="findId" onClick={() => alert("잘 기억해보세요.")}>
              아이디 찾기
            </btn>
            <btn className="findPwd" onClick={() => alert("잘 기억해보세요.")}>
              비밀번호 찾기
            </btn>
            <btn className="SignUp" onClick={() => alert("안껴줄거지롱")}>
              회원가입
            </btn>
          </div>
          <div className="kakaologinContainer">
            <a href="http://localhost:8080/oauth2/authorization/kakao">
              <img
                className="kakaoLogin"
                src="/img/kakao_login_medium_narrow.png"
                alt="kakao-login"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
