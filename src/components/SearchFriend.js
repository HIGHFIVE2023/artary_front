import React, { useState } from "react";
import { call } from "../service/ApiService";

const SearchFriend = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState({
    nickname: "",
    email: "",
    profileImage: "",
  });

  const { nickname, email, profileImage } = searchResult;

  const handleSearch = async () => {
    try {
      const response = await call(`/friend/search/${searchEmail}`, "GET", null);
      console.log(response.nickname);
      // 확인한 response의 형태에 따라 데이터 추출 방법을 수정해야 합니다.
      // 아래의 예시는 response가 배열인 경우를 가정합니다.

      setSearchResult({
        nickname: response.nickname,
        email: response.email,
        profileImage: response.profileImage,
      });
    } catch (error) {
      console.error("친구 검색 오류:", error);
      setSearchResult({ nickname: "", email: "", profileImage: "" }); // 에러 발생 시 결과를 빈 배열로 초기화
    }
  };

  const handleAddFriend = async () => {
    try {
      const response = await call(`/friend/${email}`, "POST", {
        email: searchEmail,
      });
      console.log(response);
      // 친구 추가 성공 메시지를 화면에 표시
      alert("친구 요청 성공~");
      // 검색 결과 초기화
      setSearchResult({ nickname: "", email: "" });
    } catch (error) {
      console.error("친구 추가 오류:", error);
      alert("친구 추가에 실패하였습니다.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        placeholder="친구 이메일을 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>
      <div>
        {/* 검색 결과가 빈 문자열이 아닌 경우에 정보를 표시 */}
        {nickname !== "" && email !== "" ? (
          <div>
            <div className="searchingResult">
              {profileImage && (
                <img
                  className="friendImage"
                  src={profileImage}
                  alt="프로필 이미지"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
              <div className="friendInfo">
                <p>{nickname}</p>
                <p>{email}</p>
              </div>

              {/* 친구 검색 결과에 따라 다른 정보를 표시할 수 있습니다 */}
              <button onClick={handleAddFriend} className="requestButton">
                친구 요청
              </button>
            </div>
          </div>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchFriend;
