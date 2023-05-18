import React from 'react';
import {useSelector} from "react-redux";
import classes from './StopList.module.css'

const StopList = () => {

    const {menuList} = useSelector((state) => state.menu);

    return (
        <div  className={classes.mainBlock}>
            <h2 className={classes.title}>Стоп лист</h2>
            {menuList.map((el, index) => {
                if (el.isStop === true) {
                    return <div key={index} className={classes.item}>
                    <span className={classes.itemName}>
                        {el.name}
                    </span>
                    </div>
                }
            })}
        </div>
    );
};

export default StopList;