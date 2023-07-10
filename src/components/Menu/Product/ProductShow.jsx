import React from 'react';
import classes from "./Product.module.css";
import classesMain from '../../../generalStyle/mainWithTitle.module.css';

const ProductShow = ({product}) => {

    return (
        <div className={classesMain.main}>
            <h2 className={classesMain.title}>Карточка товара:</h2>
            <div className={classes.item}>
                <span className={classes.titleName}>Название: </span>
                <span>{product.name}</span>
            </div>
            <div className={classes.item}>
                <span  className={classes.titleName}>Цена: </span>
                <span>{product.price}р</span>
            </div>
            <div className={classes.itemTextarea}>
                <span  className={classes.titleName}>Описание: </span>
                <span className={classes.description}>{product?.description ? product.description : 'Описание отсутствует'}</span>
            </div>
        </div>
    );
};

export default ProductShow;