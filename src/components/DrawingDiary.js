import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { call } from "../service/ApiService";

const DrawingDiary = () => {
  const { diaryId } = useParams();
  const [diary, setDiary] = useState({ emotion: "", image: "", createdAt: "" });
  const [hasPermission, setHasPermission] = useState(false);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [songDuration, setSongDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [showVolumeBar, setShowVolumeBar] = useState(false);

  useEffect(() => {
    call(`/diary/${diaryId}`, "GET", null)
      .then((response) => {
        console.log(response);
        setDiary(response);
        setHasPermission(true);
      })
      .catch((error) => {
        console.log(error);
        setHasPermission(false);
      });
  }, [diaryId]);

  const { emotion, image, createdAt } = diary;

  const emotionImg = {
    HAPPY: "emotion01.png",
    SOSO: "emotion02.png",
    SAD: "emotion03.png",
    ANGRY: "emotion04.png",
  };

  const emotionImgSrc = `/img/${emotionImg[emotion]}`;

  const date = createdAt.substring(0, 10);

  //오디오 플레이어
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        // setSongDuration(audioRef.current.duration); // 이 부분을 주석 처리합니다
        setIsAudioLoaded(true); // 오디오가 로드되면 true로 설정
      });

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
  }, [audioRef]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleVolumeBar = () => {
    setShowVolumeBar(!showVolumeBar); // 음량 조절 바를 표시/숨김
  };

  if (!hasPermission) {
    return (
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "10px",
          color: "red",
        }}
      >
        🚫 접근 권한이 없는 페이지입니다. 🚫
      </h1>
    );
  }
  console.log("Song Duration:", songDuration);

  console.log("Progress Bar Width:", (currentTime / songDuration) * 100);

  return (
    <div className="Left">
      <header>
        <div className="theDate">날짜: {date}</div>
        <div className="todayEmotion">
          <div className="Emotion">{"오늘의 기분:"} </div>
          <img className="emotionImg" src={emotionImgSrc} />
        </div>
      </header>
      <div className="imageContainer">
        <img className="diaryImage" src={image} alt="Diary Image" />
      </div>
      <footer>
        <div className="bgm">
          <audio
            ref={audioRef}
            src={diary.bgm}
            loop
            style={{ maxWidth: "100%" }}
            onLoadedMetadata={() => {
              setSongDuration(audioRef.current.duration); // 로드 이벤트에서 duration 설정
            }}
          ></audio>
          <button
            onClick={togglePlay}
            style={{ backgroundColor: "transparent" }}
          >
            {isPlaying ? (
              <img
                src="../img/stop.png"
                alt="정지"
                style={{ width: "3.5em" }}
              />
            ) : (
              <img
                src="../img/play.png"
                alt="재생"
                style={{ width: "3.5em" }}
              />
            )}
          </button>
          <div className="progressBar">
            <div
              className="progress"
              style={{
                width:
                  songDuration > 0
                    ? `${(currentTime / songDuration) * 100}%`
                    : "0%",
              }}
            ></div>
          </div>
          <button
            onClick={togglePlay}
            style={{ backgroundColor: "transparent" }}
            disabled={!isAudioLoaded}
          ></button>
          <button
            onClick={toggleVolumeBar}
            style={{ backgroundColor: "transparent", fontSize: "em" }}
          >
            🔈
          </button>
          {showVolumeBar && ( // 추가: showVolumeBar 상태가 true일 때만 음량 조절 바 표시
            <div className="volumeBar">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
export default DrawingDiary;
