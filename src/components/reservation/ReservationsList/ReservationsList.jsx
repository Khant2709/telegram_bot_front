import React, {useEffect, useState} from 'react';
import classes from './ReservationsList.module.css'

const ReservationsList = ({list, day}) => {

    const [sortList, setSortList] = useState([]);

    useEffect(() => {
        setSortList(list.sort((a, b) => a.timeReservation > b.timeReservation ? 1 : -1))
    }, [list])

    const result = sortList.map((el, index) => {
        const date = new Date(el.timeReservation);
        let status;
        let borderColor;

        switch (el.status) {
            case 'reserv' :
                status = <div>Забронирован </div>
                borderColor = classes.notConfirmed
                break;
            case 'busy' :
                status = <div>Сидят</div>
                borderColor = classes.seat
                break;
            default:
                status = <div>Не задан</div>
                borderColor = ''
        }
        if (el.status !== 'free') {
            return <div className={`${classes.main} ${borderColor}`} key={index}>
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
        }
    })

    return (
        <>
            <div className={classes.title}>Список броней на {day} число</div>
            {result.length === 0
                ? <div className={classes.reservation}>Броней пока нет</div>
                : result
            }
        </>
    );
};

export default ReservationsList;