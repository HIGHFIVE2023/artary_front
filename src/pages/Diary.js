import React from "react";
import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";
import DrawingDiary from "../components/DrawingDiary";
import WritingDiary from "../components/WritingDiary";
import Springs from "../components/Springs";
import Circles from "../components/Circles";

const Diary = () => {
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
              <BottomBtn image="../img/share.png"></BottomBtn>
            </div>
          </div>
          <div className="SpringMaker">
            <Circles style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs />
            </div>
            <Circles style={{ marginLeft: "1em" }} />
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
    </div>
  );
};

export default Diary;
