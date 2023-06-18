import IndexBtn from "../components/IndexBtn";
import Register from "../components/Register";

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
          <div className="LoginIndexBtnContainer">
            <IndexBtn />
          </div>
        </div>
        <div className="LeftDivOveray">
          <img className="DiaryIntro" src="/img/intro.png" />
        </div>
        <div className="RightDivOveray">
          <img className="signupIcon" src="/img/icon.png" alt="login icon" />
          <Register />
        </div>
      </div>
    </div>
  );
};
export default SignUp;
