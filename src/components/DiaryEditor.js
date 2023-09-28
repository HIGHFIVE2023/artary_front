import React, { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IndexBtn from "../components/IndexBtn";
import Springs from "./Springs";
import Circles from "./Circles";
import EmotionItem from "../components/EmotionItem";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion.js";
import PicPopup from "./PicPopup";
import StcPopup from "./StcPopup";
import { call } from "../service/ApiService";
import Loading from "../service/Loading";

const DiaryEditor = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [diaryId, setDiaryId] = useState("");
  const [isLoadingMusic, setIsLoadingMusic] = useState(false);

  const [emotion, setEmotion] = useState(3);
  const [diary, setDiary] = useState({ image: "" });

  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

  //기본 선택 감정 3번감정
  const [date, setDate] = useState(getStringDate(new Date()));

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion); // 클릭한 감정(emotion_id)으로 state 변경
  });

  const navigate = useNavigate();

  //그림 생성 팝업
  const [isPicPopupOpen, setPicPopupOpen] = useState(false);
  const [isPicButtonVisible, setPicButtonVisible] = useState(true);

  //첫 문장 추천 팝업
  const [isStcPopupOpen, setStcPopupOpen] = useState(false);
  const [isStcButtonVisible, setStcButtonVisible] = useState(true);

  // 그림 생성 팝업 오픈 + 닫기
  const openPicPopup = () => {
    if (content.length < 1) {
      contentRef.current.focus(); // 한 글자도 안 썼을때 textarea에 포커스.
      return;
    }

    setPicPopupOpen(true);
    setPicButtonVisible(false);
  };
  const closePicPopup = () => {
    setPicPopupOpen(false);
    setPicButtonVisible(true);
  };

  //그림 생성 팝업 오픈 시, 데이터 넘기기
  const handleSubmitPic = () => {
    if (content.length < 1) {
      contentRef.current.focus(); // 한 글자도 안 썼을때 textarea에 포커스.
      return;
    }

    const emotionName = {
      1: "HAPPY",
      2: "SOSO",
      3: "SAD",
      4: "ANGRY",
    };

    const req = {
      title,
      content,
      emotion: emotionName[emotion],
    };

    call("/diary/write", "POST", req)
      .then((response) => {
        console.log(response);
        setDiaryId(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //그림 생성 이후, 그림 띄우기
  const { image } = diary;

  const handleSubmitClick = () => {
    setPicPopupOpen(false);

    call(`/diary/temporary/${diaryId}`, "GET", null)
      .then((response) => {
        console.log(response);
        setDiary(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //첫문장 생성 팝업 오픈 + 닫기
  const openStcPopup = () => {
    setStcPopupOpen(true);
    setStcButtonVisible(false);
  };
  const closeStcPopup = () => {
    setStcPopupOpen(false);
    setStcButtonVisible(true);
  };

  //저장
  const handleClick = () => {
    setIsLoadingMusic(true);

    call(`/diary/${diaryId}/save`, "POST", null)
      .then((response) => {
        if (response.status === 200) {
          console.log("음악 생성이 완료되었습니다.");
          // 이후에 필요한 작업을 수행합니다.
        } else {
          console.error("음악 생성에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoadingMusic(false);
        navigate(`/diary/${diaryId}`);
      });
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
      {isLoadingMusic ? ( // isLoadingMusic가 true이면 로딩 페이지를 표시
        <Loading /> // 로딩 페이지 컴포넌트를 만들어서 이곳에 렌더링합니다.
      ) : (
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
                <div className="imageContainer">
                  {!image ? null : (
                    <img src={image} className="diaryImage" alt="Diary Image" />
                  )}
                </div>
              </div>
              <div className="LeftBottomDiv">
                {isStcButtonVisible && (
                  <button
                    className="BottomBtns"
                    onClick={() => {
                      openStcPopup();
                    }}
                  >
                    ✏️ 첫 문장 추천
                  </button>
                )}
                {isStcPopupOpen && <StcPopup onClose={closeStcPopup} />}
                {isPicButtonVisible && (
                  <button
                    className="BottomBtns"
                    onClick={() => {
                      openPicPopup();
                      handleSubmitPic();
                    }}
                  >
                    🎨 그림 생성
                  </button>
                )}
                {isPicPopupOpen && (
                  <PicPopup
                    diaryId={diaryId}
                    onClose={closePicPopup}
                    onSubmitClick={handleSubmitClick}
                  />
                )}
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
                  className="BottomBtns"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  💾 저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryEditor;
