import React, { useState, useEffect, useRef, useContext } from "react";
import { deleteUser } from "../service/ApiService";
import Circles from "../components/Circles";
import Springs from "../components/Springs";
import IndexBtn from "../components/IndexBtn";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { ActiveContext } from "./Friends";
import SearchFriend from "../components/SearchFriend";
import FriendsList from "../components/FriendsList";
import FriendRequest from "../components/FriendRequest";
import { act } from "react-dom/test-utils";

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

  let contents = [<SearchFriend />, <FriendsList />, <FriendRequest />];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [password, setPassword] = useState("");
  const activeTab = useContext(ActiveContext);

  const navigate = useNavigate();
  const navigateToMypageUpdate = () => {
    navigate("/mypage/update");
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
    if (password) {
      deleteUser(userId, password)
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
            <div className="mypage">
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

              <button onClick={navigateToMypageUpdate} className="basic-btn">
                프로필 수정
              </button>
              <button onClick={handleOpenPopup} className="basic-btn">
                회원 탈퇴
              </button>
              {isPopupOpen && (
                <div
                  className="password-popup"
                  elevation={2}
                  style={{
                    position: "absolute",
                    top: "35%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "40%",
                    maxHeight: "90%",
                    overflowY: "auto",
                    backgroundColor: "white",
                  }}
                >
                  <div className="password-content">
                    <h2>비밀번호를 입력하세요</h2>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>
                      <p>{errorMessage && <p>{errorMessage}</p>}</p>
                      <button className="basic-btn" onClick={handleClosePopup}>
                        Cancel
                      </button>
                      <button className="basic-btn" onClick={handleDeleteUser}>
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {successMessage && <p>{successMessage}</p>}
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
            <div className="tab-content">
              <p>현재탭{activeTab}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
