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

  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

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

  //스프링
  const calculateSpringCount = () => {
    const windowHeight = window.innerHeight;
    // 원하는 로직에 따라 화면 높이에 따라 갯수를 계산할 수 있습니다.
    // 예를 들어, 높이가 특정 값 이하일 때는 4개, 그 이상일 때는 6개로 설정
    if (windowHeight <= 200) {
      return 1;
    } else if (windowHeight <= 250) {
      return 2;
    } else if (windowHeight <= 350) {
      return 3;
    } else if (windowHeight <= 450) {
      return 4;
    } else if (windowHeight <= 550) {
      return 5;
    } else {
      return 6;
    }
  };

  const updateSpringCount = () => {
    const count = calculateSpringCount();
    setSpringCount(count);
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
            <div className="containerOfLeft">
              <p
                style={{
                  width: "85%",
                  height: "1em",
                  marginTop: "0",
                  padding: "1em",
                  backgroundColor: "rgb(246, 255, 149)",
                  borderRadius: "10px",
                  fontFamily: "Cafe24Supermagic-Bold-v1.0",
                  fontWeight: "bold",
                }}
              >
                📕 {nickname} 님의 일기
              </p>
              <p
                style={{
                  width: "100%",
                  marginLeft: "10%",
                  height: "1em",
                  margin: "0",
                  padding: "1em",
                  fontFamily: "Cafe24Supermagic-Bold-v1.0",
                }}
              >
                {"<가장 스티커를 많이 받은 일기>"}
              </p>
              <MostLikes />
            </div>
          </div>
          <div className="SpringMaker">
            <Circles count={springCount} style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs count={springCount} />
            </div>
            <Circles count={springCount} style={{ marginLeft: "1em" }} />
          </div>
          <div className="RightDivOveray">
            {hasPermission && diaries.length != 0 ? (
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
              <div style={{ width: "100%", alignItems: "center" }}>
                작성된 일기가 없습니다.
              </div>
            )}
            <div
              className="Pagination"
              style={{ width: "100%", alignItems: "center" }}
            >
              <button
                className="basic-btn"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                이전
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                className="basic-btn"
                onClick={() => handlePageChange(currentPage + 1)}
              >
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
