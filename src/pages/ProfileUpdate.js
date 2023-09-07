import React, { useState, useEffect, useRef } from "react";
import { updateUser } from "../service/ApiService";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Circles from "../components/Circles";
import Springs from "../components/Springs";
import imageCompression from "browser-image-compression";
import IndexBtn from "../components/IndexBtn";
import { useNavigate } from "react-router";

const ProfileUpdate = () => {
  // 로컬 스토리지에서 사용자 정보를 읽어옵니다.
  const userDto = JSON.parse(localStorage.getItem("user"));
  const [nickname, setNickname] = useState(userDto.nickname);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(userDto.image);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInput = useRef(null);

  //오류메시지
  const [pwdMsg, setPwdMsg] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");

  //버튼 활성화
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  const handleUpdateProfile = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    //업데이트
    const updateUserDto = {
      token: userDto.token,
      email: userDto.email,
      name: userDto.name,
      userId: userDto.userId,
      nickname,
      image,
      password,
    };

    //localSotrage에 담길 값 (보안상 password 제외)
    const updatedUserDto = {
      token: userDto.token,
      email: userDto.email,
      name: userDto.name,
      userId: userDto.userId,
      nickname,
      image,
    };

    updateUser(userDto.userId, updateUserDto)
      .then((response) => {
        console.log(response);
        setSuccessMessage("프로필이 성공적으로 업데이트되었습니다.");
        localStorage.setItem("user", JSON.stringify(updatedUserDto));
        window.location.href = "/mypage";
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("프로필 업데이트에 실패하였습니다.");
      });
  };

  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      let file = e.target.files[0]; // 입력받은 file 객체

      // 이미지 resize 옵션 설정
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 300,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        setFile(compressedFile);

        // resize된 이미지의 url을 받아 이미지 업데이트
        const promise = imageCompression.getDataUrlFromFile(compressedFile);
        promise.then((result) => {
          setImage(result);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
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
            <div
              className="ProfileUpdate"
              style={{ position: "absolute", width: "100%" }}
            >
              <h1>프로필 수정</h1>
              <div>
                <form onSubmit={handleUpdateProfile}>
                  <div>
                    <Avatar
                      size={170}
                      style={{ marginBottom: "0.4em", marginTop: "0.1em" }}
                      icon={<UserOutlined />}
                      src={image}
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/jpg,image/png,image/jpeg"
                    ref={fileInput}
                    onChange={handleFileChange}
                  />
                  <br />
                  <label style={{ margin: "2em" }}>닉네임</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                      if (nickname.length < 2 || nickname.length > 10) {
                        setNicknameMessage(
                          "닉네임은 2자 이상 10자 이하로 입력해주세요."
                        );
                      } else {
                        setNicknameMessage("사용가능한 닉네임 입니다.");
                      }
                    }}
                  />
                  <br />
                  <p className="message">{nicknameMessage}</p>
                  <br />
                  <label style={{ margin: "2em" }}>비밀번호</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      const passwordRegExp =
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
                      if (!passwordRegExp.test(e.target.value)) {
                        setPwdMsg(
                          "비밀번호는 8~30 자리이면서 알파벳, 숫자, 특수문자를 포함해야 합니다."
                        );
                      } else {
                        setPwdMsg("안전한 비밀번호입니다.");
                        setDisable(false);
                      }
                    }}
                  />
                  <br />
                  <p className="message">{pwdMsg}</p>
                  <br />
                  <button onClick={() => navigate(-1)} className="basic-btn">
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={disable}
                    className="basic-btn"
                  >
                    저장
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="SpringMaker">
            <Circles style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs />
            </div>
            <Circles style={{ marginLeft: "1em" }} />
          </div>
          <div className="RightDivOveray"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
