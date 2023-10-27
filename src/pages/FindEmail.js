import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import IndexBtn from "../components/IndexBtn";
import Circles from "../components/Circles";
import Springs from "../components/Springs";
import { call } from "../service/ApiService";

const FindEmail = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

  const navigate = useNavigate();

  const handleFindEmail = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const data = new URLSearchParams();
    data.append("name", name);
    data.append("nickname", nickname);

    call("/users/email", "POST", data)
      .then((response) => {
        setSuccessMessage("아이디는 " + response.data + " 입니다.");
      })
      .catch((error) => {
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
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}

            <div className="extra-login-group">
              <btn className="findId" onClick={navigateToLogin}>
                로그인 가기
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
