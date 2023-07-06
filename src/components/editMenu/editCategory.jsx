import React, {useEffect, useState} from 'react';
import classes from './editCategory.module.css'
import back from "../../img/back.png";
import {useNavigate} from "react-router";
import {useTelegram} from "../../hooks/useTelegram";
import useMainButtonEvent from "../../hooks/useMainButtonEvent";
import {sendData} from "../../unitFunction/onSendData";


const EditCategory = () => {

        const [name, setName] = useState('');
        const [nameRu, setNameRu] = useState('');

        const navigate = useNavigate();
        const tokenAdmin = window.localStorage.getItem('tokenUser');
        const {tg, queryId} = useTelegram();

        const onSendData = () => {
            sendData({queryId, name, nameRu, token: tokenAdmin}, '/addCategory')
        }

        useMainButtonEvent(tg, onSendData);
        useEffect(() => {
            if (name && nameRu) {
                tg?.MainButton.show();
                tg?.MainButton.setParams({
                    text: `Создать категорию`,
                });
            } else {
                tg?.MainButton.hide();
            }
        }, [tg, name, nameRu])

        return (
            <>
                <div className={classes.header}>
                    <img src={back} onClick={() => navigate(-1)}/>
                </div>
                <div className={classes.mainBlock}>
                    <h2 className={classes.title}>
                        Создание новой категории
                    </h2>
                    <input placeholder={'Введите название категории на EN'}
                           value={name}
                           onChange={(e) => setName(e.target.value)}/>
                    <input placeholder={'Введите название категории на RU'}
                           value={nameRu}
                           onChange={(e) => setNameRu(e.target.value)}/>
                </div>
            </>
        );
    }
;

export default EditCategory;