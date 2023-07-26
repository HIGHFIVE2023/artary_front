import React, { useState, useEffect, useRef } from "react";
import { updateUser} from "../service/ApiService";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Circles from "../components/Circles";
import Springs from "../components/Springs";
//엄청난 수정이 필요해 
const ProfileUpdate = () => {
  // 로컬 스토리지에서 사용자 정보를 읽어옵니다.
  const userDto = JSON.parse(localStorage.getItem("user"));
  const [userId, setUserId] = useState(null);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInput = useRef(null);

  useEffect(() => {
    if (userDto) {
      setUserId(userDto.userId);
      setNickname(userDto.nickname);
      setImage(userDto.image);
    }
  }, [userDto]);


  const handleUpdateProfile = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지

    const updatedUserDto = {
      userId,
      nickname,
      image,
      password,
    };

    updateUser(userId, updatedUserDto)
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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
  
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    }
  };

  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="LeftDivOveray">
            <div className="ProfileUpdate">
              <div>
                <h1>프로필 수정</h1>
                <div>
                  <Avatar size={200} style={{ margin: '20px' }} icon={<UserOutlined />} src={image} />
                </div>
              </div>
              <div>
                <form onSubmit={handleUpdateProfile}>
                  <label>프로필 사진:</label>
                  <input type="file" accept='image/jpg,impge/png,image/jpeg' ref={fileInput} onChange={handleFileChange} />
                  <br />
                  <label>닉네임:</label>
                  <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                  <br />
                  <label>비밀번호:</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <br />
                  <button type="submit">저장</button>
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
          <div className="RightDivOveray">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;