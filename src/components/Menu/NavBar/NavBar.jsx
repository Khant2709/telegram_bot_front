import React from 'react';
import classes from "./NavBar.module.css";
import {useNavigate} from "react-router";

const NavBar = ({category, linkTo}) => {

    const navigate = useNavigate();

    return (
        <div  className={classes.mainBlock}>
            {category.map((el, index) => {
                return <div key={index}  className={classes.item} onClick={() => navigate(`${linkTo[index]}`)}>
                    {el}
                </div>
            })}
        </div>
    );
};

export default NavBar;