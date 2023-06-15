import React from 'react';
import {useSelector} from "react-redux";
import classes from './StopList.module.css'
import {updateData} from "../../unitFunction/onSendData";
import {useTelegram} from "../../hooks/useTelegram";
import back from "../../img/back.png";
import {useNavigate} from "react-router";

const StopList = ({tokenAdmin}) => {

    const {menuList} = useSelector((state) => state.menu);
    const navigate = useNavigate();
    const {queryId} = useTelegram();

    const deleteInStop = (id,name, isStop) => {
        updateData(
            {
                id,
                name,
                queryId,
                isStop,
                token: tokenAdmin
            },
            '/updateProduct');
    }

    return (
        <div className={classes.mainBlock}>
            <div className={classes.header}>
                <img src={back} onClick={() => navigate(-1)}/>
                <h2 className={classes.title}>Стоп лист</h2>
            </div>
            {menuList.map((el, index) => {
                if (el.isStop === true) {
                    return <div key={index} className={classes.item}>
                    <span className={classes.itemName}>
                        {el.name}
                    </span>
                        <button onClick={() => deleteInStop(el._id, el.name, false)}>
                            Удалить из стопа
                        </button>
                    </div>
                }
            })}
        </div>
    );
};

export default StopList;