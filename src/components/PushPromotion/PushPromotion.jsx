import React, {useState} from 'react';
import classes from './PushPromotion.module.css'
import {useNavigate} from "react-router";
import {sendData} from "../../unitFunction/onSendData";

const PushPromotion = ({tokenAdmin}) => {

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const pushPromotion = () => {
        sendData({message, token: tokenAdmin}, '/pushPromotion')
            .then(() => {
                navigate('/')
            })
    }

    return (
        <div className={classes.main}>
            <h2>Создание рассылки</h2>
            <textarea placeholder={'Введите тект, который хотите разослать'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}/>
            <div className={classes.buttons}>
                <button  className={classes.btn} onClick={() => navigate(-1)}>Назад</button>
                <button  className={classes.btn} onClick={pushPromotion}>Отправить</button>
            </div>
        </div>
    );
};

export default PushPromotion;