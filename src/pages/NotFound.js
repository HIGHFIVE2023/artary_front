import React, { useState, useEffect } from "react";
import IndexBtn from "../components/IndexBtn";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

function NotFound() {
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
            <Circles count={springCount} style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs count={springCount} />
            </div>
            <Circles count={springCount} style={{ marginLeft: "1em" }} />
          </div>
          <div className="RightDivOveray">
            <div className="not-found-container">
              <h1>404 ERROR</h1>
              <h2 className="not-found-heading">잘못된 접근입니다</h2>
              <p className="not-found-message">
                요청하신 페이지를 찾을 수 없습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
