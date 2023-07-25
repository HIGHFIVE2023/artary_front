import React, { useState, useEffect } from "react";
import { deleteUser, call} from "../service/ApiService";
import Friends from "./Friends";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

const Mypage = () => {
  const userDto = JSON.parse(localStorage.getItem("user"));
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [email, setEmail] = useState(null);
  const [image, setImage] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userDto) {
      setUserId(userDto.userId);
      setName(userDto.name);
      setNickname(userDto.nickname);
      setEmail(userDto.email);
      setImage(userDto.image);
      
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

  const handleDeleteUser = () => {
    const userPassword = window.prompt("회원 탈퇴를 위해 비밀번호를 입력해주세요", "");
  
    if (userPassword) {
      deleteUser(userId, userPassword)
        .then((response) => {
          console.log(response);
          setSuccessMessage("회원 탈퇴가 완료되었습니다.");
          localStorage.clear();
          window.location.href = "/";
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("회원 탈퇴에 실패하였습니다.");
        });
    } else {
      setErrorMessage("비밀번호를 입력해야 합니다.");
    }
  };

  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="LeftDivOveray">
            <div>
              <h1>마이페이지</h1>
              {nickname && email ? (
                <div>
                  <p>Name: {name}</p>
                  <p>Nickname: {nickname}</p>
                  <p>Email: {email}</p>
                  <p>Image: {image} </p>
                </div>
              ) : (
                <p>Loading user information...</p>
              )}
            </div>
            <div>
              <button onClick={handleUpdateUserInfo}>프로필 수정</button>
              <button onClick={handleDeleteUser}>회원 탈퇴</button>
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