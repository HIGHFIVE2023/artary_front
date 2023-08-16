import React, { useState, useEffect } from "react";
import { call } from "../service/ApiService"; // ApiService 경로에 따라 수정
import axios from "axios";
import { useParams } from "react-router-dom";

const MostLikes = () => {
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

  return (
    <div className="mostLikesContainer">
      {mostStickerDiary ? (
        <div>
          <p>
            <span>{nickname}님</span>의 친구들은 <br />
            <span>
              {date.substring(0, 4)}년 {date.substring(5, 7)}월{" "}
              {date.substring(8, 10)}일
            </span>
            에 작성된
            <br />"{mostStickerDiary.title}" 일기에
            <br />
            가장 많은 반응을 보였어요.
          </p>

          <p>스티커 수: {mostStickerDiary.stickerCount} 개</p>
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
