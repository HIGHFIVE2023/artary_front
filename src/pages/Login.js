import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { login } from "../service/ApiService";
import IndexBtn from "../components/IndexBtn";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

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

  const navigateToFindPw = () => {
    navigate("/users/password");
  };

  const navigateToFindEmail = () => {
    navigate("/users/email");
  };

  //스프링
  const calculateSpringCount = () => {
    const windowHeight = window.innerHeight;
    let count;

    if (windowHeight <= 200) {
      count = 1;
    } else if (windowHeight <= 275) {
      count = 2;
    } else if (windowHeight <= 375) {
      count = 3;
    } else if (windowHeight <= 475) {
      count = 4;
    } else if (windowHeight <= 550) {
      count = 5;
    } else {
      count = 6;
    }
    return count;
  };

  const updateSpringCount = () => {
    const count = calculateSpringCount();
    setSpringCount(count);
  };

  // 스프링 간격 설정
  const springMargin = {
    marginTop: "2em", // 맨 앞 스프링의 상단 간격
    marginBottom: "0.5em", // 맨 뒤 스프링의 하단 간격
    marginLeft: "1em", // 중간 스프링들의 좌측 간격
    marginRight: "1em", // 중간 스프링들의 우측 간격
  };

  useEffect(() => {
    // 화면 크기 변경 감지를 위한 이벤트 리스너 등록
    window.addEventListener("resize", updateSpringCount);

    // 컴포넌트가 마운트될 때 한 번 호출
    updateSpringCount();

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateSpringCount);
    };
  }, []);

  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="IndexBtnContainer">
            <IndexBtn />
          </div>
          <div className="LeftDivOveray">
            <img className="DiaryIntro" src="/img/intro.png" />
            <div className="intro01">
              <h3>
                <img src="/img/introPallete.png" />
                AI가 그려주는 하루
              </h3>
              <div className="introSpan">
                <span>
                  일기를 쓰는 하루가 즐겁도록
                  <br />
                  그림과 음악을 생성하고
                  <br />
                  당신의 키워드를 통해
                  <br />
                  일기의 첫문장을 추천합니다.
                  <br />
                  친구와 서로 도장을 주고받아요.
                </span>
                <img
                  src="/img/intro01.png"
                  style={{ width: "37%", marginLeft: "3%" }}
                />
              </div>
            </div>
            <div className="intro02">
              <h3>
                <img src="/img/introFace.png" />내 감정 되돌아보기
              </h3>
              <div className="introSpan">
                <span>
                  나의 감정을 통계로 확인하고
                  <br />
                  캘린더로 일기와 감정을
                  <br />
                  모아보세요.
                </span>
                <img
                  src="/img/intro02.png"
                  style={{ width: "37%", marginLeft: "10%" }}
                />
              </div>
            </div>
          </div>
          <div className="SpringMaker">
            <Circles count={springCount} style={springMargin} />
            <div className="Spring">
              <Springs count={springCount} style={springMargin} />
            </div>
            <Circles count={springCount} style={springMargin} />
          </div>
          <div className="RightDivOveray">
            <img className="LoginIcon" src="/img/icon.png" alt="login icon" />
            <div className="input-group">
              <input
                className="id"
                id="id"
                name="id"
                placeholder="아이디를 입력해주세요"
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

export default Login;
