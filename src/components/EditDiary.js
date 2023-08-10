import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import IndexBtn from "../components/IndexBtn";
import Springs from "./Springs";
import Circles from "./Circles";
import EmotionItem from "../components/EmotionItem";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";
import Popup from "./Popup";
import { call } from "../service/ApiService";

const EditDiary = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const contentRef = useRef();
  const [diary, setDiary] = useState({});
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [emotion, setEmotion] = useState("");
  const [date, setDate] = useState("");
  const [isDataLoaded, setDataLoaded] = useState(false);

  // diaryId 지정
  const pathname = window.location.pathname;
  const extractDiaryIdFromPathname = (pathname) => {
    const pathParts = pathname.split("/");
    const diaryIdIndex = pathParts.indexOf("diary") + 1;
    if (diaryIdIndex > 0 && diaryIdIndex < pathParts.length) {
      return pathParts[diaryIdIndex];
    }
    return null;
  };
  const diaryId = extractDiaryIdFromPathname(pathname);

  useEffect(() => {
    call(`/diary/${diaryId}`, "GET", null)
      .then((response) => {
        console.log(response);
        setDiary(response);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [diaryId]);

  useEffect(() => {
    if (isDataLoaded) {
      setEmotion(Number(findKeyByValue(emotionName, diary.emotion)));
      setDate(getStringDate(new Date(diary.createdAt.split("T")[0])));
      setTitle(diary.title);
      setContent(diary.content);
    }
  }, [isDataLoaded, diary]);

  const [isLoading, setLoading] = useState(false);

  // 감정 불러오기
  const emotionName = {
    1: "HAPPY",
    2: "SOSO",
    3: "SAD",
    4: "ANGRY",
  };

  const findKeyByValue = (obj, value) => {
    for (const key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
    return null; // 해당 값과 일치하는 키를 찾지 못한 경우 null을 반환
  };

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion); // 클릭한 감정(emotion_id)으로 state 변경
  });

  const navigate = useNavigate();

  //팝업
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(true);

  // 팝업 열기 이벤트 핸들러
  const openPopup = () => {
    if (content.length < 1) {
      contentRef.current.focus(); // 한 글자도 안 썼을때 textarea에 포커스.
      return;
    }

    setPopupOpen(true);
    setButtonVisible(false);
  };

  // 팝업 닫기 이벤트 핸들러
  const closePopup = () => {
    setPopupOpen(false);
    setButtonVisible(true);
  };

  //그림 생성 버튼
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus(); // 한 글자도 안 썼을때 textarea에 포커스.
      return;
    }

    const req = {
      title,
      content,
      emotion: emotionName[emotion],
    };

    setLoading(true);

    call(`/diary/${diaryId}`, "PUT", req)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  //그림 생성 이후, 그림 띄우기
  const { image } = diary;

  const handleSubmitClick = () => {
    setPopupOpen(false);

    call(`/diary/temporary/${diaryId}`, "GET", null)
      .then((response) => {
        console.log(response);
        setDiary(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //수정
  const handleClick = () => {
    console.log(diaryId);
    call(`/diary/${diaryId}/edit`, "PUT", null)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate(`/diary/${diaryId}`);
  };
  const saveView = () => {
    if (window.confirm("그림 생성을 완료하셨습니까? 완료 시 저장됩니다.")) {
      alert("저장되었습니다.");
    } else {
      alert("그림 생성 버튼을 눌러 그림 생성을 진행하세요.");
    }
  };

  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="IndexBtnContainer">
            <IndexBtn type={"write"} text1={"일기쓰기"} />
          </div>
          <div className="LeftDivOveray">
            <div className="Left">
              <header>
                <div className="theDate">
                  <input
                    className="input-date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                  />
                </div>
                <div className="Emotion">
                  {"기분"}
                  {emotionList.map((it) => (
                    <EmotionItem
                      key={it.emotion_id}
                      {...it}
                      onClick={handleClickEmote}
                      isSelected={it.emotion_id === emotion}
                    />
                  ))}
                </div>
              </header>
              <div className="container">
                {!image ? null : (
                  <img
                    src={image}
                    className="getDiaryImage"
                    alt="Diary Image"
                  />
                )}
              </div>
            </div>
            <div className="LeftBottomDiv">
              {isButtonVisible && (
                <button
                  className="drawBtn"
                  onClick={() => {
                    openPopup();
                    handleSubmit();
                  }}
                >
                  그림 생성
                </button>
              )}
              {isPopupOpen && (
                <Popup
                  diaryId={diaryId}
                  onClose={closePopup}
                  onSubmitClick={handleSubmitClick}
                />
              )}
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
            <div className="Right">
              <header>
                <div className="title">제목: </div>
                <input
                  placeholder="제목을 입력하세요."
                  type="text"
                  className="inputTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="writer">작성자: {user.nickname}</div>
              </header>
              <div class="textarea-container">
                <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="오늘 하루는 어땠나요?"
                />
              </div>
            </div>
            <div className="RightBottomDiv">
              <button
                className="saveBtn"
                onClick={() => {
                  handleClick();
                  saveView();
                }}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDiary;
