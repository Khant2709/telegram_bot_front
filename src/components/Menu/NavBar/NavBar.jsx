import React from 'react';
import classes from '../../../generalStyle/mainWithTitle.module.css'
import itemClasses from '../../../generalStyle/item.module.css'
import {useNavigate} from "react-router";

const NavBar = ({category, linkTo}) => {

    const navigate = useNavigate();

    return (
        <div  className={classes.main}>
            {category.map((el, index) => {
                return <div key={index}  className={itemClasses.item} onClick={() => navigate(`${linkTo[index]}`)}>
                    {el}
                </div>
            })}
        </div>
    );
};

export default NavBar;