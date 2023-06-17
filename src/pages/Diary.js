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
            <IndexBtn type={"diary"} text1={"다이어리"} />
          </div>
        </div>
        <div className="LeftDivOveray">
          <DrawingDiary />
          <div className="LeftBottomDiv">
            <BottomBtn image="../img/share.png"></BottomBtn>
          </div>
        </div>
        <div className="RightDivOveray">
          <WritingDiary />
          <div className="RightBottomDiv">
            <BottomBtn image="../img/edit.png"></BottomBtn>
            <BottomBtn image="../img/delete.png"></BottomBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
