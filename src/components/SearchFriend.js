import React, { useState } from "react";
import { call } from "../service/ApiService";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const initialState = {
  isFriend: false,
  sendRequest: false,
  getRequest: false,
};

const SearchFriend = () => {
  const defaultImageURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState({
    nickname: "",
    email: "",
    image: "",
  });
  const [isFriend, setIsFriend] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);
  const [getRequest, setGetRequest] = useState(false);
  const [buttonState, setButtonState] = useState(initialState);

  const { nickname, email, image } = searchResult;

  const handleSearch = async () => {
    try {
      const response = await call(`/friend/search/${searchEmail}`, "GET", null);
      console.log(response.nickname);
      // 확인한 response의 형태에 따라 데이터 추출 방법을 수정해야 합니다.
      // 아래의 예시는 response가 배열인 경우를 가정합니다.

      setSearchResult({
        nickname: response.nickname,
        email: response.email,
        image: response.image,
      });

      setGetRequest(false);
      setSendRequest(false);
      handleCheckFriend(response.email);
      handleCheckRequest(response.email);
    } catch (error) {
      console.error("친구 검색 오류:", error);
      setSearchResult({ nickname: "", email: "", image: "" }); // 에러 발생 시 결과를 빈 배열로 초기화
    }
  };

  const updateButtonState = (newState) => {
    setButtonState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const handleAddFriend = async () => {
    try {
      const response = await call(`/friend/${email}`, "POST", null);
      console.log(response);
      // 친구 추가 성공 메시지를 화면에 표시
      alert("친구 요청 성공~");
      setSendRequest(true);
    } catch (error) {
      console.error("친구 추가 오류:", error);
      alert("친구 추가에 실패하였습니다. : " + error.message);
    }
  };

  const handleCheckFriend = async (checkEmail) => {
    try {
      const response = await call(
        `/friend/checkFriend/${checkEmail}`,
        "GET",
        null
      );
      console.log(response);
      setIsFriend(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckRequest = async (checkEmail) => {
    try {
      const response = await call(
        `/friend/checkRequest/${checkEmail}`,
        "GET",
        null
      );
      console.log(response);
      if (response && response.length > 0) {
        if (response[0].fromUserId.id === user.userId) {
          setSendRequest(true);
        } else if (response[0].toUserId.id === user.userId) {
          setGetRequest(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="searchingBar">
        <input
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="친구 이메일을 입력하세요"
        />
        <button onClick={handleSearch} className="basic-btn">
          검색
        </button>
      </div>

      <div>
        {/* 검색 결과가 빈 문자열이 아닌 경우에 정보를 표시 */}
        {nickname !== "" && email !== "" ? (
          <div>
            <div className="user-item">
              {image && (
                <Avatar
                  style={{ margin: "0.3em" }}
                  size={40}
                  icon={<UserOutlined />}
                  src={image}
                />
              )}
              {!image && (
                <Avatar
                  size={40}
                  style={{ margin: "0.3em" }}
                  icon={<UserOutlined />}
                  src={defaultImageURL}
                />
              )}
              <div>
                <p>{nickname}</p>
                <p>{email}</p>
              </div>
              {/* 친구 검색 결과에 따라 다른 정보를 표시할 수 있습니다 */}
              {isFriend ? (
                <button disabled>친구</button>
              ) : (
                <>
                  {getRequest ? (
                    <button disabled>요청 확인</button>
                  ) : (
                    <button
                      onClick={handleAddFriend}
                      className="frndBtn"
                      disabled={sendRequest}
                    >
                      {sendRequest ? "친구요청 완료" : "친구 요청"}
                    </button>
                  )}
                </>
              )}
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
