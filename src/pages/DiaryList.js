import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { call } from "../service/ApiService";
import IndexBtn from "../components/IndexBtn";
import Springs from "../components/Springs";
import Circles from "../components/Circles";

const DiaryList = () => {
  const { nickname } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchDiaries(currentPage);
  }, [currentPage]);

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
            {nickname} 님의 일기
          </div>
          <div className="SpringMaker">
            <Circles style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs />
            </div>
            <Circles style={{ marginLeft: "1em" }} />
          </div>
          <div className="RightDivOveray">
            {diaries && diaries.length > 0 ? (
              <div>
              {diaries.map((diary) => (
                  <div key={diary.id} style={{ paddingLeft: "150px" }}>
                    <Link key={diary.id} to={`/diary/${diary.id}`} style={{ color: "black" }}>
                      <img src={diary.image} style={{ maxWidth: "80px", maxHeight: "80px" }}/>
                      {diary.title}
                      {new Date(diary.createdAt).toISOString().split("T")[0]}
                    </Link>
                  </div>
              ))}
            </div>
            ): (
              <div>작성된 일기가 없습니다.</div>
            )}
            <div className="Pagination" style={{ paddingLeft: "150px" }}>
              <button onClick={() => handlePageChange(currentPage - 1)}>이전</button>
              <span>{currentPage} / {totalPages}</span>
              <button onClick={() => handlePageChange(currentPage + 1)}>다음</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryList;