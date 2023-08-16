import React, { useState, useEffect, useRef } from "react";
import { deleteUser } from "../service/ApiService";
import Friends from "./Friends";
import Circles from "../components/Circles";
import Springs from "../components/Springs";
import IndexBtn from "../components/IndexBtn";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const userDto = JSON.parse(localStorage.getItem("user"));
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [email, setEmail] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const navigate = useNavigate();
  const navigateToMypageUpdate = () => {
    navigate("/mypage/update");
  };

  useEffect(() => {
    if (userDto) {
      setUserId(userDto.userId);
      setName(userDto.name);
      setNickname(userDto.nickname);
      setEmail(userDto.email);
      setImage(userDto.image);
    }
  }, []);

  const handleDeleteUser = () => {
    const userPassword = window.prompt(
      "회원 탈퇴를 위해 비밀번호를 입력해주세요",
      ""
    );

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
          <div className="IndexBtnContainer">
            <IndexBtn type={"mypage"} text4={"마이페이지"} />
          </div>
          <div className="LeftDivOveray">
            <div>
              <h1>마이페이지</h1>
              {nickname && email ? (
                <div>
                  <Avatar
                    size={200}
                    style={{ margin: "20px" }}
                    icon={<UserOutlined />}
                    src={image}
                  />
                  <p>이름: {name}</p>
                  <p>닉네임: {nickname}</p>
                  <p>이메일: {email}</p>
                </div>
              ) : (
                <p>Loading user information...</p>
              )}
            </div>
            <div>
              <button onClick={navigateToMypageUpdate}>프로필 수정</button>
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
