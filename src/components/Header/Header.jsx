import React from 'react';
import classes from './Header.module.css'
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";

const Header = () => {

    const {onClose, user} = useTelegram();

    return (
        <div className={classes.header}>
            {/*забираем данные из ТГ с помощью 'initDataUnsafe', точнее обьект user -> username (отображается  только в кнопке в сообщении)*/}
            <span className={classes.userName}>
                {user?.username}
            </span>

            <Button onClick={onClose}>Закрыть</Button>
        </div>
    );
};

export default Header;