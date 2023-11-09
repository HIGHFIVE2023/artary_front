import React, { useState, useEffect } from "react";

import IndexBtn from "../components/IndexBtn";
import Register from "../components/Register";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

const SignUp = ({}) => {
  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

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
            <img className="signupIcon" src="/img/icon.png" alt="login icon" />
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
