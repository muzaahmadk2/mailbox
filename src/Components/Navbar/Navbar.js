import { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from './Navbar.module.css';
import { Route, Routes,  } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import { useSelector,useDispatch } from "react-redux";
import { authAction } from "../Store/authSlice";
import InboxMail from "../Inbox/InboxMail";


const NavBar = () =>{
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(authAction.logout());
    }
return(
    <Fragment>
        <Navbar bg='light' variant="light" className={classes.navbar}>
        <div className={classes.container}>
            <h2>MyWebLink</h2>
            <Nav>
                <ul>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Products</a>
                    </li>
                    <li>
                        <a href="#">About Us</a>
                    </li>
                    {isLoggedIn && <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>}

                </ul>
            </Nav>
        </div>
        </Navbar>
        <Routes>
            {isLoggedIn && <Route path="/" element={<Welcome />} />}
            {isLoggedIn && <Route path="/home" element={<Welcome/>} />}
            <Route path="/home/:mailid" element={<InboxMail />} />
        </Routes>
    </Fragment>
)
}
export default NavBar;