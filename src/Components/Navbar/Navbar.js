import { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from './Navbar.module.css';
import { Route, Routes,  } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import { useSelector } from "react-redux";


const NavBar = () =>{
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
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
                </ul>
            </Nav>
        </div>
        </Navbar>
        <Routes>
            {isLoggedIn && <Route path="/" element={<Welcome />} />}
            {isLoggedIn && <Route path="/home" element={<Welcome/>} />}
        </Routes>
    </Fragment>
)
}
export default NavBar;