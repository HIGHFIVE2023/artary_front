import React, { useState, useEffect } from "react";
import axios from "axios";
import { call } from "../service/ApiService";
import Friends from "./Friends";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

const Mypage = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [nickname, setNickname] = useState(null);
  const [email, setEmail] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // localStorage에서 사용자 정보를 가져옴
    const userDto = JSON.parse(localStorage.getItem("user"));
    if (userDto) {
      console.log(userDto.nickname);
      setNickname(userDto.nickname);
      setEmail(userDto.email);
    }
  }, []);

  const handleUpdateUserInfo = () => {
    // 서버로 변경된 유저 정보를 보낼 PUT 요청
    call(`/users/${userId}`, "PUT", { email: newEmail })
      .then((response) => {
        console.log(response);
        setSuccessMessage("유저 정보가 수정되었습니다.");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("유저 정보 수정에 실패하였습니다.");
        setSuccessMessage("");
      });
  };

  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="LeftDivOveray">
            <div>
              <h1>User Information</h1>
              {nickname && email ? (
                <div>
                  <p>Nickname: {nickname}</p>
                  <p>Email: {email}</p>
                </div>
              ) : (
                <p>Loading user information...</p>
              )}
            </div>
            <div>
              <h1>Change Email</h1>
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button onClick={handleUpdateUserInfo}>Update</button>
              {successMessage && <p>{successMessage}</p>}
              {errorMessage && <p>{errorMessage}</p>}
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
            <Friends />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
