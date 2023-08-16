import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { call, deleteSticker } from "../service/ApiService";
import SelectStamp from "./SelectStamp";

const WritingDiary = () => {
  const { diaryId, stickerId } = useParams();
  const [diary, setDiary] = useState({ title: "", content: "", user: { nickname: "" } });
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const [stickers, setStickers] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);

  //팝업
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);

  //스티커 마우스 핸들러
  const [hoveredUserNickname, setHoveredUserNickname] = useState(null);

  // 팝업 열기 이벤트 핸들러
  const openPopup = () => {
    setPopupOpen(true);
    setButtonVisible(false);
  };

  // 팝업 닫기 이벤트 핸들러
  const closePopup = () => {
    setPopupOpen(false);
    setButtonVisible(true);
  };

  //다이어리 내용 불러오기
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

  const { title, content, user } = diary;
  const { nickname } = user;

  //원고지
  const numRows = 9;
  let numCols = 8;

  if (content.length > 72) {
    numCols = Math.ceil(content.length / numRows);
  }

  const squares = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const idx = i * numCols + j;
      const char = idx < content.length ? content[idx] : "";
      squares.push(<TextSquare key={idx} text={char} />);
    }
  }

  function TextSquare({ text }) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "35px",
          height: "35px",
          border: "1px solid black",
        }}
      >
        {text}
      </div>
    );
  }

  //스티커 불러오기
  useEffect(() => {
    call(`/diary/${diaryId}/stickers`, "GET", null)
      .then((response) => {
        console.log(response);
        setStickers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [diaryId]);

  //칸칸이 배열하기
  function chunkArray(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
  const chunks = chunkArray(stickers, 5);

  //타입별로 사진 연결하기 + 삭제 버튼 띄우기
  function publicUrl(imageFileName) {
    return process.env.PUBLIC_URL + "/img/" + imageFileName;
  }

  function renderStickerImage(sticker) {
    const typeToImage = {
      goodJob: "goodJob.png",
      goodLuck: "goodLuck.png",
      perfect: "perfect.png",
      cheerUp: "cheerUp.png",
    };

    const imageFileName = typeToImage[sticker.type];
    const altText =
      sticker.type.charAt(0).toUpperCase() + sticker.type.slice(1);

    const checkStickerUser = loginUser.userId === sticker.user.id;

    return (
      <div
        className="stickerContainer"
        onMouseEnter={() => handleMouseEnter(sticker.user.nickname)}
        onMouseLeave={handleMouseLeave}
      >
        {checkStickerUser && hoveredUserNickname === sticker.user.nickname && (
          <button
            className="deleteStickerBtn"
            onClick={() => handleDeleteSticker(sticker)}
          >
            ❌
          </button>
        )}
        <img src={publicUrl(imageFileName)} alt={altText} />
      </div>
    );
  }

  //스티커 수정 삭제
  const handleDeleteSticker = (sticker) => {
    deleteSticker(diaryId, sticker.id)
      .then((response) => {
        console.log("스티커가 성공적으로 삭제되었습니다!");
        alert("도장이 성공적으로 삭제 되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        console.error("스티커 삭제 오류:", error);
      });
  };

  //마우스 올리면 유저 닉네임 뜨게 하기
  function handleMouseEnter(nickname) {
    setHoveredUserNickname(nickname);
  }

  function handleMouseLeave() {
    setHoveredUserNickname(null);
  }

  if (!hasPermission) {
    return (
      <div></div>
    );
  }

  return (
    <div className="Right">
      <header>
        <div className="title">제목: {title}</div>
        <div className="writer">작성자: {user.nickname}</div>
      </header>
      <div className="TextSquareContainer">{squares}</div>
      <footer>
        <div className="stampHeader">{"<도장을 찍어요!>"}</div>
        {isButtonVisible && nickname !== loginUser.nickname && (
          <button
            className="selectStampBtn"
            onClick={() => {
              openPopup();
            }}
          >
            도장 선택하기
          </button>
        )}
        {isPopupOpen && <SelectStamp diaryId={diaryId} onClose={closePopup} />}
        <br />
        <div className="GetSticker">
          {/* 리스트 불러와야 하는 곳 */}
          <div className="scrollContainer">
            {chunks.map((chunk, rowIndex) => (
              <div key={rowIndex} className="row">
                {chunk.map((sticker, index) => (
                  <div key={index} className="sticker">
                    <div className="stickerWrapper">
                      {/* 타입 사진 연결 */}
                      {renderStickerImage(sticker)}
                      {hoveredUserNickname && (
                        <div className="userNicknamePopup">
                          {hoveredUserNickname} !
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {/* 한 줄에 5칸이 되도록 빈 div로 */}
                {Array.from({ length: 5 - chunk.length }).map((_, index) => (
                  <div key={`empty-${index}`} className="sticker"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WritingDiary;
