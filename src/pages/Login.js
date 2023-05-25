import { Link } from "react-router-dom";

import IndexBtn from "../components/IndexBtn";

const Login = ({}) => {
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
            />
            <input
              className="pwd"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <button className="loginbtn" onClick={() => alert("로그인")}>
            로그인
          </button>
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
            <img
              className="kakaoLogin"
              src="/img/kakao_login_medium_narrow.png"
              alt="kakao-login"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
