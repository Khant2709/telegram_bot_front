import React, {useEffect, useState} from 'react';
import classes from './MenuItem.module.css';
import classesMain from '../../../generalStyle/mainWithTitle.module.css';
import itemClasses from '../../../generalStyle/item.module.css'
import {useDispatch} from "react-redux";
import {addProductList, deleteProductList, updateMenu} from "../../../Redux/Slices/Menu";
import {useTelegram} from "../../../hooks/useTelegram";
import {useNavigate} from "react-router";
import useMainButtonEvent from '../../../hooks/useMainButtonEvent'
import {sendData} from "../../../unitFunction/onSendData";

import { Dropdown } from 'primereact/dropdown';

const MenuItem = ({dataList, myKey, menuList, totalPrice, addedProductList}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tg, queryId} = useTelegram();
    const [place, setPlace] = useState('');
    const placeName = [
        {nameEn: 'vip_1', nameRu: 'vip-1'},
        {nameEn: 'vip_2', nameRu: 'vip-2'},
        {nameEn: 'vip_3', nameRu: 'vip-3'},
        {nameEn: 'vip_4', nameRu: 'vip-4'},
        {nameEn: 'vip_5', nameRu: 'vip-5'},
        {nameEn: 'vip_6', nameRu: 'vip-6'},
        {nameEn: 'vip_7', nameRu: 'vip-7'},
        {nameEn: 'table_1', nameRu: 'Стол 1'},
        {nameEn: 'table_2', nameRu: 'Стол 2'},
        {nameEn: 'table_3', nameRu: 'Стол 3'},
    ]
    const time = new Date().getHours();

    const onSendData = () => {

        sendData(
            {
                queryId,
                products: addedProductList,
                totalPrice: totalPrice,
                place: place.nameEn
            },
            '/makeOrder');
    }

    useMainButtonEvent(tg, onSendData);

    const decreaseCount = (id) => {
        dispatch(updateMenu(menuList.map(el => {
            if (el._id === id && el.count > 0) {
                dispatch(deleteProductList(el));
                return {...el, count: el.count - 1}
            } else {
                return el
            }
        })));
    }

    const increaseCount = (id) => {
        dispatch(updateMenu(menuList.map(el => {
            if (el._id === id) {
                dispatch(addProductList(el));
                return {...el, count: el.count + 1}
            } else {
                return el
            }
        })));
    }
    useEffect(() => {
        if (addedProductList.length !== 0 && myKey === 'basket' && !!place) {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${totalPrice}`
            })
        } else {
            tg.MainButton.hide();
        }
    }, [addedProductList, myKey, place, tg.MainButton, totalPrice])

    return (
        <div className={classesMain.main}>
            {myKey === 'basket' && <>
                <h2 className={classesMain.title}>Корзина</h2>
                <span className="p-float-label">
                    <Dropdown inputId="place"
                          value={place}
                          onChange={(e) => setPlace(e.value)}
                          options={placeName}
                          optionLabel="nameRu"
                          className="w-full md:w-14rem my-3 " />
                    <label htmlFor="place">Укажите, где сидите</label>
                </span>
            </>}

            {dataList?.map((el, index) => {
                const checkTimePromotion = el?.promotionTimeStart <= time && el?.promotionTimeFinish > time;
                const promotion = !el?.promotionTimeStart || !el?.promotionTimeFinish || checkTimePromotion;

                if (!el.isStop) {
                    return <div key={index} className={itemClasses.itemEdit}>
                    <span className={classes.itemName} onClick={() => navigate(`${el._id}`)}>
                        {el.name}
                    </span>
                        <span className={classes.itemPrice}>
                        {el.price} р
                    </span>
                        {promotion &&
                        <div className={classes.itemBuy}>
                            <i className={el.count === 0
                                ? "pi pi-minus-circle opacity-50 w-1rem align-self-center"
                                : "pi pi-minus-circle w-1rem align-self-center"}
                               onClick={() => decreaseCount(el._id)}
                            disa/>
                            <span>{el.count}</span>
                            <i className="pi pi-plus-circle w-1rem align-self-center"
                               onClick={() => increaseCount(el._id)}/>
                        </div>
                        }
                    </div>
                }
            })}
            {myKey === 'basket' && totalPrice !== 0 &&
            <div className={classes.footer}>Общая сумма: {totalPrice} р</div>}
        </div>
    );
};

export default MenuItem;