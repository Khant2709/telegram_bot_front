import React, {useEffect, useState} from 'react';
import classes from './Reservation.module.css'
import Calendar from "react-calendar";
import {useTelegram} from "../../hooks/useTelegram";
import {sendData} from "../../unitFunction/onSendData";
import useMainButtonEvent from "../../hooks/useMainButtonEvent";
import ButtonBack from "../ButtonBack/ButtonBack";

const AddReservation = () => {

    const {tg, queryId} = useTelegram();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [time, setTime] = useState('');
    const [placeReservation, setPlace] = useState('')
    const [value, onChange] = useState(new Date());
    const [error, setError] = useState({});

    const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const checkPhone = phoneNumber.split('').every(el => number.some(element => element === el));

    useEffect(() => {
        const guestName = window.localStorage.getItem('guestName');
        const guestPhone = window.localStorage.getItem('guestPhone');
        if (guestName || guestPhone) {
            guestName && setName(guestName);
            guestPhone && setPhoneNumber(guestPhone);
        }
    }, [])

    useEffect(() => {
        !name.trim()
            ? name && setNameError('Нельзя отправлять только пробелы')
            : nameError && setNameError('')

        !checkPhone
            ? phoneNumber && setPhoneNumberError('Номер должен состоять только из цифр')
            : phoneNumberError && setPhoneNumberError('')

    }, [name, phoneNumber])


    const onSendData = () => {
        const timeReservation = new Date(value.getFullYear(), value.getMonth(), value.getDate(), Number(time.split(':')[0]), Number(time.split(':')[1]), 0);

        window.localStorage.setItem('guestName', name);
        window.localStorage.setItem('guestPhone', phoneNumber);

        sendData(
            {
                queryId,
                today: new Date().getTime(),
                name,
                phoneNumber,
                timeReservation: timeReservation.getTime(),
                placeReservation,
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
        if (name && !!name.trim() && phoneNumber && checkPhone && time && placeReservation && value) {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Отправить заявку`
            })
        } else {
            tg.MainButton.hide();
        }
    }, [name, phoneNumber, time, tg.MainButton, placeReservation, value])

    return (
        <>
            <ButtonBack/>
            <div className={classes.main}>
                <h3 className={classes.title}>Заявка на бронирование</h3>
                <input className={classes.inp} value={name} placeholder={'Укажите имя'}
                       onChange={(e) => setName(e.target.value)}/>
                {nameError &&
                <div className={classes.err}>
                    {nameError}
                </div>}
                <input className={classes.inp} type={'tel'} placeholder={'Укажите ваш телефон'} value={phoneNumber}
                       onChange={(e) => {
                           setPhoneNumber(e.target.value)
                       }}/>
                {phoneNumberError &&
                <div className={classes.err}>
                    {phoneNumberError}
                </div>}
                <div className={classes.time}>
                    <span>Укажите время: </span>
                    <input className={classes.inp} type={'time'} value={time}
                           onChange={(e) => setTime(e.target.value)}/>
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
                {error.status === 400 &&
                <div className={classes.err}>
                    {error.text}
                </div>}
                <h3 className={classes.calendarLable}>Выберите дату:</h3>
                <Calendar onChange={onChange} value={value}/>
            </div>
        </>
    );
};

export default AddReservation;

