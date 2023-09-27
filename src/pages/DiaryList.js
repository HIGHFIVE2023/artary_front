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
                {nickname} 님의 일기
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
            <Circles count={springCount} style={springMargin} />
            <div className="Spring">
              <Springs count={springCount} style={springMargin} />
            </div>
            <Circles count={springCount} style={springMargin} />
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
