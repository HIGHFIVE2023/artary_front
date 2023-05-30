import IndexBtn from "../components/IndexBtn";

const SignUp = ({}) => {
  return (
    <div className="Diary">
      <div className="DiaryFrame">
        <div className="DiaryImageContainer">
          <img
            className="DiaryImage"
            src="/img/diary.png"
            alt="diary background"
          />
          <div className="IndexBtnContainer">
            <IndexBtn />
          </div>
        </div>
        <div className="LeftDivOveray"></div>
        <div className="RightDivOveray">
          <img className="LoginIcon" src="/img/icon.png" alt="login icon" />
          <div className="input-group">
            <input className="name" id="name" name="name" placeholder="이름" />
            <input
              className="email"
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
            />
            <input className="id" id="id" name="id" placeholder="아이디" />
            <input
              className="pwd"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
            />
            <input
              className="pwd"
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호 재입력"
            />
          </div>
          <button className="signupBtn" onClick={() => alert("로그인")}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
