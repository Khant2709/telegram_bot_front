import React from 'react';
import {useNavigate} from "react-router";
import {useTelegram} from "../../../hooks/useTelegram";

const ButtonBack = () => {

    const {tg} = useTelegram();
    const navigate = useNavigate();

    tg?.MainButton.hide();

    return (
    <i className="pi pi-arrow-left w-1 m-3" onClick={() => navigate(-1)}> </i>
    );
};

export default ButtonBack;