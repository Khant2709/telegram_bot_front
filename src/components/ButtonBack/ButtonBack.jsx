import React from 'react';
import back from "../../img/back.png";
import {useNavigate} from "react-router";
import classes from "./ButtonBack.module.css";

const ButtonBack = () => {

    const navigate = useNavigate();

    return (
            <img className={classes.back} src={back} alt={'back'} onClick={() => navigate(-1)}/>
    );
};

export default ButtonBack;