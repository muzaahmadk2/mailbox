import { Fragment } from "react";
import { Navbar,Container, Nav } from "react-bootstrap";
import classes from './Navbar.module.css';


const NavBar = () =>{
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
    </Fragment>
)
}
export default NavBar;