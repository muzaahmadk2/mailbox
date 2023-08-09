import { Fragment } from "react";
import AuthForm from "./Components/Auth/AuthForm";
import NavBar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Fragment>
      <NavBar/>
      <AuthForm/>
    </Fragment>
  );
}

export default App;
