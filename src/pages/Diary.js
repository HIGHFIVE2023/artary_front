import React from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";
import DrawingDiary from "../components/DrawingDiary";
import WritingDiary from "../components/WritingDiary";
import Springs from "../components/Springs";
import Circles from "../components/Circles";
import { deleteDiary } from "../service/ApiService";
import { useParams } from "react-router";

const Diary = () => {
  const { diaryId } = useParams();

  const handleDeleteDiary = () => {
    deleteDiary(diaryId)
      .then((response) => {
        console.log("다이어리 항목이 성공적으로 삭제되었습니다!");
        alert("일기가 성공적으로 삭제 되었습니다.");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        console.error("다이어리 항목 삭제 오류:", error);
      });
  };

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
              <Link to={`/diary/${diaryId}/edit`}>
                <BottomBtn image="../img/edit.png"></BottomBtn>
              </Link>
              <BottomBtn
                image="../img/delete.png"
                onClick={handleDeleteDiary}
              ></BottomBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
