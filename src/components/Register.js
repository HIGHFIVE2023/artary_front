import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //오류 메시지
  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  //중복확인
  const [isname, setIsName] = useState(false);
  const [isnickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const onChangeName = (e) => {
    const currentId = e.target.value;
    setName(currentId);
  };

  const onChangeNickname = async (e) => {
    const currentName = e.target.value;
    setNickname(currentName);
    if (currentName.length < 2 || currentName.length > 10) {
      setNicknameMessage("닉네임은 2자 이상 10자 이하로 입력해주세요.");
      setIsNickname(false);
    } else {
      setNicknameMessage("사용가능한 닉네임 입니다.");
      setIsNickname(true);
    }
    await axios
      .get(`http://localhost:8080/users/signup/nickname/${currentName}/exists`)
      .then((response) => {
        if (response.data === false) {
          setIsNickname(true);
        } else {
          setNicknameMessage("이미 존재");
          setIsNickname(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onChangeEmail = async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if (!emailRegExp.test(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailMsg("올바른 이메일 형식입니다.");
      setIsEmail(true);
    }
  };

  const onCheckEmail = async (e) => {
    await axios
      .get(`http://localhost:8080/users/signup/email/${email}/exists`)
      .then((response) => {
        setEmail(email);
        if (response.data === false) {
          setEmailMsg("사용 가능한 이메일입니다.");
          setIsEmail(true);
        } else {
          setEmailMsg("이미 존재");
          setIsEmail(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangePwd = (e) => {
    const currPwd = e.target.value;
    setPassword(currPwd);
    const passwordRegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
    if (!passwordRegExp.test(currPwd)) {
      setPwdMsg(
        "비밀번호는 8~30 자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다."
      );
      setIsPassword(false);
    } else {
      setPwdMsg("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    // 회원가입 요청을 보내는 함수
    e.preventDefault();
    await axios
      .post("http://localhost:8080/users/signup", {
        name,
        nickname,
        email,
        password,
      })
      .then((response) => {
        // 회원가입 성공 시 처리
        console.log(response.data); // 응답 데이터 확인
        // 회원가입 성공 후 필요한 작업 수행
        navigate("/users/login");
      })
      .catch((error) => {
        // 회원가입 실패 시 처리
        console.error(error.response.data); // 에러 응답 데이터 확인
        setError("회원가입에 실패하였습니다."); // 에러 메시지 설정
      });
  };

  return (
    <div className="input-group">
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          name="name"
          value={name}
          onChange={onChangeName}
          placeholder="이름을 입력해주세요"
        />
        <p className="message"> {nameMessage} </p>
        <input
          id="nickname"
          name="name"
          value={nickname}
          onChange={onChangeNickname}
          placeholder="닉네임을 입력해주세요"
        />
        <p className="message"> {nicknameMessage} </p>
        <input
          type="email"
          name="email"
          value={email || ""}
          onChange={onChangeEmail}
          required
          placeholder="이메일을 입력해주세요"
        />
        <button className="checkEmail" onClick={onCheckEmail}>
          이메일 중복 검사
        </button>
        <p className="message">{emailMsg}</p>
        <input
          type="password"
          value={password}
          onChange={onChangePwd}
          placeholder="비밀번호를 입력해주세요."
          required
        />
        <p className="message">{pwdMsg}</p>
        <button className="signupBtn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
