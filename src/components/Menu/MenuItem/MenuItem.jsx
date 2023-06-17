import React, {useEffect, useState} from 'react';
import classes from './MenuItem.module.css';
import plus from '../../../img/free-icon-add-3356207.png';
import minus from '../../../img/free-icon-minus-3356785.png';
import {useDispatch} from "react-redux";
import {addProductList, deleteProductList, updateMenu} from "../../../Redux/Slices/Menu";
import {useTelegram} from "../../../hooks/useTelegram";
import {useNavigate} from "react-router";
import useMainButtonEvent from '../../../hooks/useMainButtonEvent'
import {sendData} from "../../../unitFunction/onSendData";

const MenuItem = ({dataList, myKey, menuList, totalPrice, addedProductList}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {tg, queryId} = useTelegram();
    const [place, setPlace] = useState('');
    const time = new Date().getHours();

    const onSendData = () => {
        sendData(
            {
                queryId,
                products: addedProductList,
                totalPrice: totalPrice,
                place
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
        <div className={classes.mainBlock}>
            {myKey === 'basket' && <>
                <h2 className={classes.title}>Корзина</h2>
                <select className={classes.select} value={place} onChange={e => setPlace(e.target.value)}>
                    <option value={''}>Укажите, где сидите</option>
                    <option value={'vip_1'}>Vip-1</option>
                    <option value={'vip_2'}>Vip-2</option>
                    <option value={'vip_3'}>Vip-3</option>
                    <option value={'vip_4'}>Vip-4</option>
                    <option value={'vip_5'}>Vip-5</option>
                    <option value={'vip_6'}>Vip-6</option>
                    <option value={'vip_7'}>Vip-7</option>
                    <option value={'table_1'}>Стол 1</option>
                    <option value={'table_2'}>Стол 2</option>
                    <option value={'table_3'}>Стол 3</option>
                </select>
            </>}

            {dataList?.map((el, index) => {
                const checkTimePromotion = el?.promotionTimeStart <= time && el?.promotionTimeFinish > time;
                const promotion = !el?.promotionTimeStart || !el?.promotionTimeFinish || checkTimePromotion;
                if (!el.isStop) {
                    return <div key={index} className={classes.item}>
                    <span className={classes.itemName} onClick={() => navigate(`${el._id}`)}>
                        {el.name}
                    </span>
                        <span className={classes.itemPrice}>
                        {el.price} р
                    </span>
                        {promotion &&
                        <div className={classes.itemBuy}>
                            <img src={minus} className={classes.img} onClick={() => decreaseCount(el._id)}/>
                            <span>{el.count}</span>
                            <img src={plus} className={classes.img} onClick={() => increaseCount(el._id)}/>
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