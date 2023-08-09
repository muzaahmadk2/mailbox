import { Fragment } from "react";
import AuthForm from "./Components/Auth/AuthForm";
import NavBar from "./Components/Navbar/Navbar";
import { Routes,Route } from "react-router-dom";
import ForgotPass from "./Components/Forgot/ForgotPass";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <Fragment>
      <NavBar/>
      <Routes>
        {!isLoggedIn && <Route path="/" exact element={<AuthForm/>} />}
      {!isLoggedIn &&<Route path="/forgotpass" element={<ForgotPass />} />}
      </Routes>
      
    </Fragment>
  );
}

export default App;
