import React from "react";
import { useNavigate } from "react-router";
import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";
import DrawingDiary from "../components/DrawingDiary";
import WritingDiary from "../components/WritingDiary";
import Springs from "../components/Springs";
import Circles from "../components/Circles";

const Diary = () => {
  const handleEditClick = () => {};
  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="IndexBtnContainer">
            <IndexBtn type={"diary"} text2={"다이어리"} />
          </div>
          <div className="LeftDivOveray">
            <div className="preContainer">
              <button className="preDiary">{"< 이전 글"}</button>
            </div>
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
            <div className="nextContainer">
              <button className="nextDiary">{"다음 글 >"}</button>
            </div>
            <WritingDiary />
            <div className="RightBottomDiv">
              <BottomBtn
                image="../img/edit.png"
                onClick={handleEditClick}
              ></BottomBtn>
              <BottomBtn image="../img/delete.png"></BottomBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
