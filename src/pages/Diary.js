import React from "react";
import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";
import DrawingDiary from "../components/DrawingDiary";
import WritingDiary from "../components/WritingDiary";

const Diary = () => {
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
        <div className="LeftDivOveray">
          <DrawingDiary />
          <div className="LeftBottomDiv">
            <BottomBtn text={"하단버튼1"}></BottomBtn>
            <BottomBtn text={"하단버튼2"}></BottomBtn>
          </div>
        </div>
        <div className="RightDivOveray">
          <WritingDiary />
          <div className="RightBottomDiv">
            <BottomBtn text={"수정하기"}></BottomBtn>
            <BottomBtn text={"삭제하기"}></BottomBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
