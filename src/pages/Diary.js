import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";
import DrawingDiary from "../components/DrawingDiary";
import WritingDiary from "../components/WritingDiary";
import Springs from "../components/Springs";
import Circles from "../components/Circles";
import { deleteDiary } from "../service/ApiService";
import { useParams } from "react-router";
import { call } from "../service/ApiService";

const Diary = () => {
  const { diaryId } = useParams();
  const [diaryUser, setDiaryUser] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

  const { Kakao } = window;

  call(`/diary/${diaryId}/findUser`, "GET", null)
    .then((response) => {
      console.log(response);
      setDiaryUser(response);
    })
    .catch((error) => {
      console.error(error);
    });

  const handleDeleteDiary = () => {
    deleteDiary(diaryId)
      .then((response) => {
        console.log("다이어리 항목이 성공적으로 삭제되었습니다!");
        alert("일기가 성공적으로 삭제 되었습니다.");
        window.location.href = `/diary/list/${user.nickname}`;
      })
      .catch((error) => {
        console.log(error);
        console.error("다이어리 항목 삭제 오류:", error);
      });
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
            <IndexBtn type={"diary"} text2={"다이어리"} />
          </div>
          <div className="LeftDivOveray">
            <DrawingDiary />
            <div className="LeftBottomDiv">
              {diaryUser === user.userId && (
                <BottomBtn image="../img/share.png"></BottomBtn>
              )}
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
            <WritingDiary />
            <div className="RightBottomDiv">
              {diaryUser === user.userId && (
                <>
                  <Link to={`/diary/${diaryId}/edit`}>
                    <BottomBtn image="../img/edit.png"></BottomBtn>
                  </Link>
                  <BottomBtn
                    image="../img/delete.png"
                    onClick={handleDeleteDiary}
                  ></BottomBtn>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
