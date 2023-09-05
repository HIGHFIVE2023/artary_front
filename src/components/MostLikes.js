import React, { useState, useEffect } from "react";
import { call } from "../service/ApiService"; // ApiService 경로에 따라 수정
import { useParams, useNavigate } from "react-router-dom";

const MostLikes = () => {
  const navigate = useNavigate();
  const { nickname } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [mostStickerDiary, setMostStickerDiary] = useState(null);

  useEffect(() => {
    async function fetchDiaries() {
      try {
        const response = await call(`/diary/diaries`, "GET", null); // 스프링 부트의 모든 일기 조회 엔드포인트 경로로 수정
        setDiaries(response);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    }

    fetchDiaries();
  }, []);

  useEffect(() => {
    if (diaries.length === 0) {
      return;
    }

    async function fetchMostStickerDiary() {
      try {
        let mostStickers = 0;
        let mostStickerDiary = null;

        for (const diary of diaries) {
          const response = await call(
            `/diary/${diary.id}/stickers`,
            "GET",
            null
          ); // 스티커 조회 엔드포인트 경로로 수정
          const stickerCount = response.length;

          if (stickerCount > mostStickers) {
            mostStickers = stickerCount;
            mostStickerDiary = {
              id: diary.id,
              title: diary.title,
              image: diary.image,
              createdAt: diary.createdAt,
              stickerCount: stickerCount,
            };
          }
        }

        setMostStickerDiary(mostStickerDiary);
      } catch (error) {
        console.error("Error fetching sticker counts:", error);
      }
    }

    fetchMostStickerDiary();
  }, [diaries]);

  let date = null;
  if (mostStickerDiary && mostStickerDiary.createdAt) {
    date = mostStickerDiary.createdAt;
  }

  const handleImageClick = () => {
    // 이미지 클릭 시 페이지 이동 처리
    navigate(`/diary/${mostStickerDiary.id}`);
  };

  return (
    <div className="mostLikesContainer">
      {mostStickerDiary ? (
        <div
          style={{ display: "flex", alignItems: "center", lineHeight: "1.7" }}
        >
          <img
            src={mostStickerDiary.image}
            alt="Diary Image"
            onClick={handleImageClick}
          />

          <p style={{ marginRight: "2.5%", marginLeft: "2%" }}>
            <span
              style={{
                backgroundColor: "rgb(253, 183, 209, 0.6)",
                borderRadius: "5px",
              }}
            >
              {nickname}
            </span>
            님의 친구들은 <br />
            <span
              style={{
                backgroundColor: "rgb(253, 255, 154, 0.6)",
                borderRadius: "5px",
              }}
            >
              {date.substring(0, 4)}년 {date.substring(5, 7)}월{" "}
              {date.substring(8, 10)}일
            </span>
            에 작성된
            <br />
            <span
              style={{
                fontSize: "1.3em",
                textDecoration: "underline wavy",
                textDecorationColor: "rgb(151, 255, 149, 0.8)",
              }}
            >
              일기 "{mostStickerDiary.title}"에
            </span>
            <br />
            <span>총 {mostStickerDiary.stickerCount} 개의 스티커로</span>
            <br />
            가장 많이 반응했어요!
          </p>
        </div>
      ) : (
        <div>
          {diaries.length === 0 ? (
            <p>작성된 일기가 없습니다.</p>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MostLikes;
