import React, {useEffect, useState} from 'react';
import classes from './Reservation.module.css'
import Calendar from "react-calendar";
import {useTelegram} from "../../hooks/useTelegram";
import {sendData, updateData} from "../../unitFunction/onSendData";
import useMainButtonEvent from "../../hooks/useMainButtonEvent";
import {useLocation} from "react-router-dom";
import axios from "../../axios";

const AddReservation = () => {

    const {tg, user, queryId} = useTelegram();
    const token = window.localStorage.getItem('tokenUser');
    const location = useLocation();
    const reservationId = location.pathname.split('/')[2];
    console.log({location});

    const [userId, setUserId] = useState(user.id);
    const [reservId, setReservId] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [time, setTime] = useState('');
    const [placeReservation, setPlace] = useState('')
    const [value, onChange] = useState(new Date());
    const [error, setError] = useState({});
    const [confirmReservation, setConfirmReservation] = useState(false);

    useEffect(() => {
        if (location.pathname.split('/').length > 2) {
            console.log(reservationId);
            axios
                .get(`/reservation/${reservationId}`, {
                    params: {
                        token
                    }
                })
                .then((res) => {
                    console.log('res === ', res.data)
                    const {
                        name,
                        phoneNumber,
                        placeReservation,
                        timeReservation,
                        confirmReservation,
                        userId,
                        _id
                    } = res.data.doc;

                    setReservId(_id);
                    setUserId(userId);
                    setName(name);
                    setPhoneNumber(phoneNumber);
                    setTime(`${new Date(timeReservation).getHours()}:${new Date(timeReservation).getMinutes()}`)
                    setPlace(placeReservation);
                    onChange(new Date(timeReservation));
                    setConfirmReservation(confirmReservation);
                })
                .catch((err) => {
                    console.warn("Произошла ошибочка получении брони ", err)
                })
        }
    }, [])

    const removeData = () => {

        const data = {
            queryId,
            token
        }

        console.log(data)

        axios
            .delete(`/deleteReservation/${reservationId}`, {
                data: data
            })
            .then(() => {
                console.log('Произошла отправка обновлений', data)
            }).catch((err) => {
            console.warn("Произошла ошибочка обновлений ", err)
        })
    }

    const onSendData = () => {
        const timeReservation = new Date(value.getFullYear(), value.getMonth(), value.getDate(), Number(time.split(':')[0]), Number(time.split(':')[1]), 0);

        reservId
            ? updateData({
                queryId,
                token,
                _id: reservationId,
                userId,
                name,
                phoneNumber,
                timeReservation: timeReservation.getTime(),
                placeReservation,
                confirmReservation,
            }, '/updateReservation')
            : sendData(
                {
                    queryId,
                    userId,
                    today: new Date().getTime(),
                    name,
                    phoneNumber,
                    timeReservation: timeReservation.getTime(),
                    placeReservation,
                    confirmReservation
                },
                '/addReservation')
                .then((response) => {
                    console.log(response)
                    setError({
                        text: response.data,
                        status: response.status
                    })
                })
    };

    useMainButtonEvent(tg, onSendData);

    useEffect(() => {
        if (name && phoneNumber && time && placeReservation && value) {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: confirmReservation ? 'Подтвердить бронь' : `Отправить заявку`
            })
        } else {
            tg.MainButton.hide();
        }
    }, [name, phoneNumber, time, tg.MainButton, placeReservation, value])

    return (
        <div className={classes.main}>
            <h3 className={classes.title}>Заявка на бронирование</h3>
            <input className={classes.inp} value={name} placeholder={'Укажите имя'}
                   onChange={(e) => setName(e.target.value)}/>
            <input className={classes.inp} type={'tel'} placeholder={'Укажите ваш телефон'} value={phoneNumber}
                   onChange={(e) => {
                       setPhoneNumber(e.target.value)
                   }}/>
            <div className={classes.time}>
                <span>Укажите время: </span>
                <input className={classes.inp} type={'time'} value={time} onChange={(e) => setTime(e.target.value)}/>
            </div>
            <select className={classes.select} value={placeReservation} onChange={e => setPlace(e.target.value)}>
                <option value={''}>Укажите место бронирования</option>
                <option value={'Вип 1'}>Вип-1</option>
                <option value={'Вип 2'}>Вип-2</option>
                <option value={'Вип 3'}>Вип-3</option>
                <option value={'Вип 4'}>Вип-4</option>
                <option value={'Вип 5'}>Вип-5</option>
                <option value={'Вип 6'}>Вип-6</option>
                <option value={'Вип 7'}>Вип-7</option>
                <option value={'Стол 1'}>Стол 1</option>
                <option value={'Стол 2'}>Стол 2</option>
                <option value={'Стол 3'}>Стол 3</option>
            </select>
            <h3 className={classes.calendarLable}>Выберите дату:</h3>
            <Calendar onChange={onChange} value={value}/>
            {error.status === 400 &&
            <div className={classes.err}>
                {error.text}
            </div>}
            {
                reservId &&
                <>
                    <div className={classes.confirmReservation}>
                        <span>{confirmReservation ? 'Бронь подтверждена' : 'Подтвердить бронь'}</span>
                        <input type={'checkbox'}
                               checked={confirmReservation}
                               onClick={() => setConfirmReservation(true)}
                               disabled={confirmReservation}
                        />
                    </div>
                    <button className={classes.delete} onClick={removeData}>
                        Удалить бронь
                    </button>
                </>
            }
        </div>
    );
};

export default AddReservation;