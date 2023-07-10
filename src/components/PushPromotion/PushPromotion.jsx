import React, {useRef, useState} from 'react';
import classes from '../../generalStyle/mainWithTitle.module.css'
import {useNavigate} from "react-router";
import {sendData} from "../../unitFunction/onSendData";
import ButtonBack from "../generalComponents/ButtonBack/ButtonBack";

import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {InputTextarea} from 'primereact/inputtextarea';

const PushPromotion = () => {

    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();
    const tokenAdmin = window.localStorage.getItem('tokenUser');

    const showError = (error) => {
        toast.current.show({severity: 'error', summary: 'Ошибка!', detail: `${error}`, life: 3000});
    }

    const pushPromotion = () => {

        if (!message.trim()) {
            setError('Введите корректно название ');
            showError('Введите корректно название ');
        }

        if (message.trim()) {
            sendData({message, token: tokenAdmin}, '/pushPromotion')
                .then(() => {
                    navigate('/')
                })
        }
    }

    return (
        <>
            <Toast ref={toast} className={"w-8"}/>
            <ButtonBack/>
            <div className={classes.main}>
                <h2 className={classes.title}>Создание рассылки</h2>
                <div className="card flex justify-content-center my-5 w-full h-10rem">
                    <span className="p-float-label w-full h-10rem">
                        <InputTextarea id="description"
                               autoResize
                               value={message}
                               onChange={(e) => setMessage(e.target.value)}
                               className={error ? "p-invalid border-3 w-full h-10rem" : "w-full h-10rem"}/>
                        <label htmlFor="description">Введите тект, который хотите разослать</label>
                    </span>
                </div>
                <Button label={"Отправить"}
                        className={"bg-blue-500 border-round-xl w-7 text-900 align-self-center"}
                        onClick={pushPromotion}
                        disabled={message.length === 0}/>
            </div>
        </>
    );
};

export default PushPromotion;