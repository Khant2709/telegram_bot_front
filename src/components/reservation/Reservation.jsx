import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classes from './Reservation.module.css'
import axios from "../../axios";
import {useNavigate} from "react-router";
import ReservationsList from "./ReservationsList/ReservationsList";

const Reservation = () => {

        const [value, onChange] = useState(new Date());
        const [reservationsList, setReservationsList] = useState([]);
        const navigate = useNavigate();
        const startTime = new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12, 0, 0);

        useEffect(() => {
                let startTimeDay = startTime.getTime();
                let finishTimeDay = startTime.getTime() + 57600000;
                console.log(new Date(startTimeDay));
                console.log(new Date(finishTimeDay));
                axios
                    .post('/reservation', {
                        startTimeDay,
                        finishTimeDay
                    })
                    .then((res) => {
                        console.log(res.data);
                        setReservationsList(res.data);
                    })

            }, [value]
        )
        console.log(reservationsList)
        return (
            <div className={classes.main}>
                <div className={classes.btns}>
                    <button onClick={() => navigate(-1)}>
                        Назад
                    </button>
                    <button onClick={() => navigate('/AddReservation')}>
                        Забронировать
                    </button>
                </div>
                <Calendar onChange={onChange} value={value}/>
                <ReservationsList list={reservationsList} day={startTime.getDate()}/>
            </div>
        );
    }
;

export default Reservation;