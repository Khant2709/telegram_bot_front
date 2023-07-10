import React, {useEffect, useRef, useState} from 'react';
import classes from './Reservation.module.css';
import classesMain from '../../generalStyle/mainWithTitle.module.css'
import Calendar from "react-calendar";
import {useTelegram} from "../../hooks/useTelegram";
import {sendData} from "../../unitFunction/onSendData";
import useMainButtonEvent from "../../hooks/useMainButtonEvent";
import ButtonBack from "../generalComponents/ButtonBack/ButtonBack";

import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Dropdown} from "primereact/dropdown";

const AddReservation = () => {

    const {tg, queryId} = useTelegram();
    const toast = useRef(null);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [time, setTime] = useState('');
    const [placeReservation, setPlace] = useState('')
    const [value, onChange] = useState(new Date());

    const placeName = [
        {nameEn: 'vip_1', nameRu: 'Вип 1'},
        {nameEn: 'vip_2', nameRu: 'Вип 2'},
        {nameEn: 'vip_3', nameRu: 'Вип 3'},
        {nameEn: 'vip_4', nameRu: 'Вип 4'},
        {nameEn: 'vip_5', nameRu: 'Вип 5'},
        {nameEn: 'vip_6', nameRu: 'Вип 6'},
        {nameEn: 'vip_7', nameRu: 'Вип 7'},
        {nameEn: 'table_1', nameRu: 'Стол 1'},
        {nameEn: 'table_2', nameRu: 'Стол 2'},
        {nameEn: 'table_3', nameRu: 'Стол 3'},
    ]
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
        if (name && !name.trim()) {
            setNameError('Заполните коректно поле Имя');
            showError('Заполните коректно поле Имя');
        }

        if (name.trim()) {
            nameError && setNameError('');
        }

        if (!checkPhone) {
            phoneNumber && setPhoneNumberError('Номер должен состоять только из цифр');
            showError('Номер должен состоять только из цифр');
        }

        if (checkPhone) {
            phoneNumberError && setPhoneNumberError('');
        }
    }, [name, phoneNumber])

    const showError = (error) => {
        toast.current.show({severity: 'error', summary: 'Ошибка!', detail: `${error}`, life: 3000});
    }

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
                placeReservation: placeReservation.nameRu,
            },
            '/addReservation')
            .then((response) => {
                response.status === 400 && showError(response.data)
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

    console.log({placeReservation})

    return (
        <>
            <Toast ref={toast} className={"w-8"}/>
            <ButtonBack/>
            <div className={classesMain.main}>
                <h3 className={classesMain.title}>Заявка на бронирование</h3>
                <div className="card mb-5 w-full">
                        <span className="p-float-label">
                            <InputText id="name"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       className={nameError ? "p-invalid w-full" : "w-full"}/>
                            <label htmlFor="name">Укажите имя :</label>
                        </span>
                </div>
                <div className="card mb-3 w-full">
                        <span className="p-float-label">
                            <InputText id="phoneNumber"
                                       value={phoneNumber}
                                       onChange={(e) => setPhoneNumber(e.target.value)}
                                       className={phoneNumberError ? "p-invalid w-full" : "w-full"}/>
                            <label htmlFor="phoneNumber">Укажите ваш телефон :</label>
                        </span>
                </div>
                <div className={classes.time}>
                    <span>Укажите время: </span>
                    <InputText type={"time"}
                               value={time}
                               onChange={(e) => setTime(e.target.value)}
                               className={"w-5"}/>
                </div>
                <span className="p-float-label my-5">
                    <Dropdown inputId="place"
                              value={placeReservation}
                              onChange={(e) => setPlace(e.value)}
                              options={placeName}
                              optionLabel="nameRu"
                              className="w-full md:w-14rem my-3 " />
                    <label htmlFor="place">Укажите место бронирования</label>
                </span>
                <h3 className={classes.calendarLable}>Выберите дату:</h3>
                <Calendar onChange={onChange} value={value}/>
            </div>
        </>
    );
};

export default AddReservation;

