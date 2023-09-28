import React, { useState, useEffect } from "react";
import { deleteUser } from "../service/ApiService";
import Circles from "../components/Circles";
import Springs from "../components/Springs";
import IndexBtn from "../components/IndexBtn";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import Friends, { ActiveContext } from "./Friends";

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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [password, setPassword] = useState("");

  const [springCount, setSpringCount] = useState(6); // 초기값 6으로 설정

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
                    size={150}
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
            <Circles count={springCount} style={springMargin} />
            <div className="Spring">
              <Springs count={springCount} style={springMargin} />
            </div>
            <Circles count={springCount} style={springMargin} />
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
