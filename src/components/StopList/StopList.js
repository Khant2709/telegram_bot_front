import React from 'react';
import {useSelector} from "react-redux";
import classes from './StopList.module.css';
import classesMain from '../../generalStyle/mainWithTitle.module.css'
import itemClasses from '../../generalStyle/item.module.css'
import {updateData} from "../../unitFunction/onSendData";
import {useTelegram} from "../../hooks/useTelegram";
import ButtonBack from "../generalComponents/ButtonBack/ButtonBack";

import {Button} from 'primereact/button';

const StopList = () => {

    const {menuList} = useSelector((state) => state.menu);
    const tokenAdmin = window.localStorage.getItem('tokenUser');
    const {queryId} = useTelegram();

    const deleteInStop = (id, name, isStop) => {
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
        <>
            <ButtonBack/>
            <div className={classesMain.main}>
                <h2 className={classesMain.title}>Стоп лист</h2>
                {menuList.map((el, index) => {
                    if (el.isStop === true) {
                        return <div key={index} className={itemClasses.itemEdit}>
                    <span className={classes.itemName}>
                        {el.name}
                    </span>
                            <Button label="Удалить"
                                    severity="danger"
                                    className="w-5 h-2rem"
                                    onClick={() => deleteInStop(el._id, el.name, false)}/>
                        </div>
                    }
                })}
            </div>
        </>
    );
};

export default StopList;