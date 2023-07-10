import React from 'react';
import classes from "./MenuItem.module.css";
import classesMain from '../../../generalStyle/mainWithTitle.module.css';
import itemClasses from '../../../generalStyle/item.module.css'
import {useNavigate} from "react-router";

const MenuAdmin = ({dataList}) => {

    const navigate = useNavigate();
    return (
        <div className={classesMain.main}>
            {dataList?.map((el, index) => {
                return <div key={index} className={itemClasses.itemEdit} onClick={() => navigate(`${el._id}`)}>
                    <span className={classes.itemName}>
                        {el.name}
                    </span>
                    <span className={classes.itemPrice}>
                        {el.price} р
                    </span>
                    <i className="pi pi-cog w-1rem align-self-center mx-auto"
                       onClick={() => navigate(`${el._id}`)}/>
                </div>
            })}

        </div>
    );
};

export default MenuAdmin;