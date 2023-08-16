import IndexBtn from "../components/IndexBtn";
import Register from "../components/Register";
import Circles from "../components/Circles";
import Springs from "../components/Springs";

const SignUp = ({}) => {
  return (
    <div className="Diary">
      <div className="DiaryFrameContainer">
        <div className="DiaryFrame">
          <div className="IndexBtnContainer">
            <IndexBtn />
          </div>
          <div className="LeftDivOveray">
            <img className="DiaryIntro" src="/img/intro.png" />
          </div>
          <div className="SpringMaker">
            <Circles style={{ marginRight: "1em" }} />
            <div className="Spring">
              <Springs />
            </div>
            <Circles style={{ marginLeft: "1em" }} />
          </div>
          <div className="RightDivOveray">
            <img className="signupIcon" src="/img/icon.png" alt="login icon" />
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
