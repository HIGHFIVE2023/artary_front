import React from "react";
import IndexBtn from "../components/IndexBtn";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

function NotFound() {
  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="LoginIndexBtnContainer">
            <IndexBtn />
          </div>
          <div className="LeftDivOveray">
            <img className="DiaryIntro" src="/img/intro.png" />
          </div>
          <div className="SpringMaker">
            <Circles style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs />
            </div>
            <Circles style={{ marginLeft: "1em" }} />
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
