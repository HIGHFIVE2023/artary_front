import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { call } from "../service/ApiService";
import IndexBtn from "../components/IndexBtn";
import Springs from "../components/Springs";
import Circles from "../components/Circles";
import MostLikes from "../components/MostLikes";

const DiaryList = () => {
  const { nickname } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    fetchDiaries(currentPage);
  }, [currentPage]);

  useEffect(() => {
    call(`/diary/list/${nickname}/checkPermission`, "GET", null)
      .then((response) => {
        console.log(response);
        setHasPermission(response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const fetchDiaries = (page) => {
    call(`/diary/pagination/${nickname}?page=${page}`, "GET", null)
      .then((response) => {
        console.log(response);
        setDiaries(response.data);
        setTotalPages(response.pageInfo.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="IndexBtnContainer">
            <IndexBtn type={"diary"} text2={"다이어리"} />
          </div>
          <div className="LeftDivOveray">
            <div className="containerOfLeft">
              <p
                style={{
                  width: "85%",
                  height: "1em",
                  marginTop: "0",
                  padding: "1em",
                  backgroundColor: "rgb(246, 255, 149)",
                  borderRadius: "10px",
                  fontFamily: "crayon",
                  fontWeight: "bold",
                }}
              >
                {nickname} 님의 일기
              </p>
              <p
                style={{
                  width: "70%",
                  marginLeft: "10%",
                  height: "1em",
                  margin: "0",
                  padding: "1em",
                  fontFamily: "crayon",
                }}
              >
                {"<가장 스티커를 많이 받은 일기>"}
              </p>
              <MostLikes />
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
            {hasPermission ? (
              <div className="DiaryList">
                {diaries.map((diary) => (
                  <div
                    className="DiaryItem"
                    key={diary.id}
                    style={{ paddingLeft: "10%" }}
                  >
                    <Link
                      key={diary.id}
                      to={`/diary/${diary.id}`}
                      style={{ color: "black" }}
                    >
                      <div className="itemImgContainer">
                        <img src={diary.image} style={{ maxHeight: "6em" }} />
                      </div>
                      <div className="itemTextContainer">
                        {diary.title}
                        <br />
                        {new Date(diary.createdAt).toISOString().split("T")[0]}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div>작성된 일기가 없습니다.</div>
            )}
            <div className="Pagination" style={{ paddingLeft: "150px" }}>
              <button onClick={() => handlePageChange(currentPage - 1)}>
                이전
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button onClick={() => handlePageChange(currentPage + 1)}>
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryList;
