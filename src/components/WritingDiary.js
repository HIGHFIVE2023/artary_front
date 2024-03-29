import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { call, deleteSticker, getSticker } from "../service/ApiService";
import SelectStamp from "./SelectStamp";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const WritingDiary = () => {
  const { diaryId, stickerId } = useParams();
  const [diary, setDiary] = useState({
    title: "",
    content: "",
    user: { nickname: "" },
  });
  const loginUser = JSON.parse(localStorage.getItem("user"));
  let [stickers, setStickers] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);

  //팝업
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);
  const [divVisible, setDivVisible] = useState(true);

  //스티커 마우스 핸들러
  const [hoveredUserNickname, setHoveredUserNickname] = useState(null);

  // 팝업 열기 이벤트 핸들러
  const openPopup = () => {
    setPopupOpen(true);
    setButtonVisible(false);
    setDivVisible(false);
  };

  // 팝업 닫기 이벤트 핸들러
  const closePopup = () => {
    setPopupOpen(false);
    setButtonVisible(true);
    setDivVisible(true);
    window.location.reload();
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
  const [chunks, setChunks] = useState([]);
  function chunkArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  useEffect(() => {
    const updatedChunks = chunkArray(stickers, 5);
    setChunks(updatedChunks);
  }, [stickers]);

  const [isNotebookStyle, setIsNotebookStyle] = useState(false);

  const toggleStyle = () => {
    setIsNotebookStyle((prevState) => !prevState);
  };

  const createNotebookStyleContent = () => {
    const notebookStyleArray = [];
    const numCols2 = 25; // 열 수 조정
    for (let i = 0; i < numRows; i++) {
      const startIndex = i * numCols2;
      const endIndex = startIndex + numCols2;
      const lineContent = content.slice(startIndex, endIndex);
      notebookStyleArray.push(
        <div key={`notebook-line-${i}`} className="notebook-line">
          <div className="line-content">
            <div className="lined-paper-line"></div> {/* 각 줄의 밑줄 */}
            {lineContent || "\u00A0"}{" "}
            {/* 빈 줄일 경우 빈 칸을 추가하여 간격 유지 */}
          </div>
        </div>
      );
    }
    return notebookStyleArray;
  };

  //타입별로 사진 연결하기 + 삭제 버튼 띄우기
  function publicUrl(imageFileName) {
    return process.env.PUBLIC_URL + "/img/" + imageFileName;
  }
  const typeToImage = {
    goodJob: "goodJob.png",
    goodLuck: "goodLuck.png",
    perfect: "perfect.png",
    cheerUp: "cheerUp.png",
  };
  function renderStickerImage(sticker) {
    const imageFileName = typeToImage[sticker.type];
    const altText = sticker.type;

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
    return <div></div>;
  }

  return (
    <div className="Right">
      <header>
        <div className="title">제목: {title}</div>
        <div className="writer">작성자: {user.nickname}</div>
        <button className="changeStyleBtn" onClick={toggleStyle}>
          스타일 변경
        </button>
      </header>
      {isNotebookStyle ? (
        <div className="lined-paper-line">{createNotebookStyleContent()}</div>
      ) : (
        <div className="TextSquareContainer">{squares}</div>
      )}
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
        {divVisible && (
          <div className="GetSticker">
            {/* 리스트 불러와야 하는 곳 */}
            <div className="scrollContainer">
              {chunks.map((chunk, rowIndex) => (
                <div key={rowIndex} className="row">
                  {chunk.map((sticker, index) => (
                    <div key={index} className="sticker">
                      <div className="stickerWrapper">
                        {renderStickerImage(sticker)}
                        {hoveredUserNickname && (
                          <div className="userNicknamePopup">
                            {hoveredUserNickname} !
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {Array.from({ length: 5 - chunk.length }).map((_, index) => (
                    <div key={`empty-${index}`} className="sticker"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

export default WritingDiary;
