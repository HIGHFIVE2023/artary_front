import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import IndexBtn from "../components/IndexBtn";
import BottomBtn from "../components/BottomBtn";
import DrawingDiary from "../components/DrawingDiary";
import WritingDiary from "../components/WritingDiary";
import Springs from "../components/Springs";
import Circles from "../components/Circles";
import { deleteDiary } from "../service/ApiService";
import { useParams } from "react-router";
import { call } from "../service/ApiService";
import html2canvas from "html2canvas"; // 스크린 캡처 라이브러리
import jsPDF from "jspdf";

const Diary = () => {
  const { diaryId } = useParams();
  const [diaryUser, setDiaryUser] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

  const { Kakao } = window;

  call(`/diary/${diaryId}/findUser`, "GET", null)
    .then((response) => {
      console.log(response);
      setDiaryUser(response);
    })
    .catch((error) => {
      console.error(error);
    });

  const handleDeleteDiary = () => {
    deleteDiary(diaryId)
      .then((response) => {
        console.log("다이어리 항목이 성공적으로 삭제되었습니다!");
        alert("일기가 성공적으로 삭제 되었습니다.");
        window.location.href = `/diary/list/${user.nickname}`;
      })
      .catch((error) => {
        console.log(error);
        console.error("다이어리 항목 삭제 오류:", error);
      });
  };

  //화면 캡처 및 PDF 다운로드
  const handleCreatePDF = () => {
    // A4 가로 방향으로 PDF 초기화
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210], // A4 가로 방향 크기
    });

    // 현재 페이지의 전체 내용을 캡처하고 PDF로 저장
    html2canvas(document.documentElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // BottomBtn 요소를 다시 표시하기 위해 CSS 스타일 제거
      const bottomBtnElements = document.querySelectorAll(".BottomBtn");
      bottomBtnElements.forEach((element) => {
        element.style.display = "none";
      });

      // 이미지 크기 및 페이지 크기 설정
      const imgWidth = 280;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const marginLeft = 10;
      const marginTop = 20;

      // 이미지를 가운데 맞추어 추가
      pdf.addImage(imgData, "PNG", marginLeft, marginTop, imgWidth, imgHeight);
      pdf.save("diary.pdf");
    });
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
            <DrawingDiary />
            <div className="LeftBottomDiv">
              {diaryUser === user.userId && (
                <BottomBtn
                  image="../img/makePdf.png"
                  onClick={handleCreatePDF}
                ></BottomBtn>
              )}
              {diaryUser === user.userId && (
                <BottomBtn image="../img/share.png"></BottomBtn>
              )}
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
            <WritingDiary />
            <div className="RightBottomDiv">
              {diaryUser === user.userId && (
                <>
                  <Link to={`/diary/${diaryId}/edit`}>
                    <BottomBtn image="../img/edit.png"></BottomBtn>
                  </Link>
                  <BottomBtn
                    image="../img/delete.png"
                    onClick={handleDeleteDiary}
                  ></BottomBtn>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
