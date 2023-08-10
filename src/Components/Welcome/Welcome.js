import ComposeMail from "../ComposeMail/ComposeMail";
import "./Welcome.css";


function Welcome() {
  return (
    <div>
    <div className="welcome">
      <span >
        Welcome To Your Mail Box!!!
      </span>
    </div>
    <ComposeMail />
    </div>
  );
}

export default Welcome;
