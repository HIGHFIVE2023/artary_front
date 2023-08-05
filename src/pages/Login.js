import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { login } from "../service/ApiService";
import IndexBtn from "../components/IndexBtn";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); //새로고침 방지

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

  const navigateToSignUp = () => {
    navigate("/users/signup");
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
            <div className="loginContainer">
              <button className="loginbtn" onClick={handleLogin}>
                로그인
              </button>
              {error && <p className="error-message">{error}</p>}
            </div>

            <div className="extra-login-group">
              <btn className="findId" onClick={() => alert("잘 기억해보세요.")}>
                아이디 찾기
              </btn>
              <btn
                className="findPwd"
                onClick={() => alert("잘 기억해보세요.")}
              >
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

export default Login;
