import React, {useEffect, useState} from 'react';
import classes from './ReservationsList.module.css'
import {useNavigate} from "react-router";

const ReservationsList = ({list, day}) => {

    const [sortList, setSortList] = useState([]);
    const checkToken = window.localStorage.getItem('tokenUser');
    const navigate = useNavigate();

    useEffect(() => {
        setSortList(list.sort((a, b) => a.timeReservation > b.timeReservation ? 1 : -1 ))
    }, [list])

    // const sortList = list.sort((a, b) => a.timeReservation > b.timeReservation ? 1 : -1 )

    const result = sortList.map((el, index) => {
        const date = new Date(el.timeReservation);
        let status;
        let borderColor;
        const checkTime = new Date().getTime() >= el.timeReservation && el.confirmReservation

        switch (el.confirmReservation) {
            case false :
                status = <div>Не подтвержден </div>
                borderColor = classes.notConfirmed
                break;
            case checkTime :
                status = <div>Сидят</div>
                borderColor = classes.seat
                break;
            case true :
                status = <div>Подтвержден </div>
                borderColor = classes.confirmed
                break;
            default:
                status = <div>Не задан</div>
                borderColor = ''
        }

        return <div className={`${classes.main} ${borderColor}`} key={index} onClick={() => checkToken && navigate(`/AddReservation/${el._id}`)}>
            <div className={classes.place}>
                <span>Место:</span>
                <div>{el.placeReservation}</div>
            </div>
            <div className={classes.time}>
                <span>Время:</span>
                <div>{date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours()} : {date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()}</div>
            </div>
            <div className={classes.status}>
                <span>Статус:</span>
                {status}
            </div>
        </div>
    })

    return (
        <>
            <div className={classes.title}>Список броней на {day} число</div>
            {result.length === 0
                ? <div className={classes.reservation}>Броней пока нет</div>
                :   result
            }
        </>
    );
};

export default ReservationsList;