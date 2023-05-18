import React from 'react';
import classes from "./MenuItem.module.css";
import setting from "../../../img/setting.png";
import {useNavigate} from "react-router";

const MenuAdmin = ({dataList}) => {

    const navigate = useNavigate();
    return (
        <div className={classes.mainBlock}>
            {dataList?.map((el, index) => {
                return <div key={index} className={classes.item} onClick={() => navigate(`${el._id}`)}>
                    <span className={classes.itemName}>
                        {el.name}
                    </span>
                    <span className={classes.itemPrice}>
                        {el.price} р
                    </span>
                    <img src={setting} className={classes.imgSetting} onClick={() => navigate(`${el._id}`)}/>
                </div>
            })}

        </div>
    );
};

export default MenuAdmin;