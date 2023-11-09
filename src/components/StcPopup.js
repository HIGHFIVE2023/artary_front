import React, { useState } from "react";
import { call } from "../service/ApiService";

// 팝업 컴포넌트
const StcPopup = ({ onClose }) => {
  const [btnVisible, setBtnVisible] = useState(true);
  const [inputWords, setInputWords] = useState("");
  const [generatedSentence, setGeneratedSentence] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false); // 클립보드 복사 성공 여부

  const handleSubmitKeyword = () => {
    const req = { inputWords };

    setLoading(true);

    call("/diary/firstSentence", "POST", req)
      .then((response) => {
        console.log(response);
        const { generatedSentence } = response; // 생성된 문장 추출
        setGeneratedSentence(generatedSentence); // 상태 업데이트
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 클립보드에 텍스트 복사하는 함수
  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = generatedSentence;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopySuccess(true);
  };

  return (
    <div className="stcpopup">
      <h3>첫 문장 추천</h3>
      {generatedSentence ? (
        <div className="generatedSentence">
          <p>{generatedSentence}</p>
          <button className="copySentence" onClick={copyToClipboard}>
            클립보드에 복사하기
          </button>
          {copySuccess && (
            <p style={{ color: "pink", fontSize: "14px" }}>
              클립보드에 복사되었습니다!
            </p>
          )}
        </div>
      ) : (
        <div className="putKeyword">
          <p>키워드를 ' , '로 연결하여 2가지 이상 입력해주세요.</p>
          <input
            placeholder="예시> 캠핑, 친구들, 산"
            type="text"
            value={inputWords}
            onChange={(e) => setInputWords(e.target.value)}
            className="inputKeyword"
          />
          <br />
          <br />
          <button className="getSentenceBtn" onClick={handleSubmitKeyword}>
            첫 문장 생성
          </button>
        </div>
      )}
      <br />
      <button className="popCloseBtn" onClick={onClose}>
        닫기
      </button>
    </div>
  );
};

export default StcPopup;
