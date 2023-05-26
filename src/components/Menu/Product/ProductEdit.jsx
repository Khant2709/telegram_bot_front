import React, {useEffect, useState} from 'react';
import classes from "./Product.module.css";
import {useTelegram} from "../../../hooks/useTelegram";
import axios from "../../../axios";
import useMainButtonEvent from "../../../hooks/useMainButtonEvent";
import { updateData} from "../../../unitFunction/onSendData";

const ProductEdit = ({product}) => {

    const {tg, queryId} = useTelegram();

    const [category, setCategory] = useState('');
    const [categoryRu, setCategoryRu] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [promotionTimeStart, setPromotionTimeStart] = useState('');
    const [promotionTimeFinish, setPromotionTimeFinish] = useState('');
    const [isStop, setIsStop] = useState(false);
    const [BD, setBD] = useState([]);


    useEffect(() => {
        axios
            .get('/allCategory')
            .then((res) => {
                console.log('Произошла отправка запроса в БД', res.data)
                setBD(res.data);
            })
            .catch((err) => {
                console.warn("Произошла ошибочка в БД", err)
            })

        setCategory(product.category);
        setCategoryRu(product.categoryRu);
        setName(product.name);
        setPrice(product.price);
        setIsStop(product.isStop);
        setPromotionTimeStart(product?.promotionTimeStart);
        setPromotionTimeFinish(product?.promotionTimeFinish);
        setDescription(product?.description)
    }, [product])

    const onSendData = () => {
        updateData(
            {
                id: product._id,
                queryId,
                category,
                categoryRu,
                name,
                description,
                price,
                promotionTimeStart,
                promotionTimeFinish,
                isStop
            },
            '/updateProduct');
    }

    const removeData = () => {

        const data = {
            queryId
        }

        console.log(data)

        axios
            .delete(`/deleteProduct/${product._id}`, {
                data: data
            })
            .then(() => {
                console.log('Произошла отправка обновлений', data)
            }).catch((err) => {
            console.warn("Произошла ошибочка обновлений ", err)
        })
    }

    useMainButtonEvent(tg, onSendData);

    if (category && categoryRu && name && price) {
        tg.MainButton.show();
        tg.MainButton.setParams({
            text: `Изменить товар`
        })
    } else {
        tg.MainButton.hide();
    }

    return (
        <div className={classes.mainBlock}>
            <h2 className={classes.title}>{name ? name : ''}</h2>
            <select className={classes.select} value={category} onChange={e => setCategory(e.target.value)}>
                <option value={''}>Укажите категорию товара EN</option>
                {BD.map((el, index) => {
                    return <option key={index}
                                   value={el.name}>
                        {el.name}</option>
                })}
            </select>
            <select className={classes.select} value={categoryRu} onChange={e => setCategoryRu(e.target.value)}>
                <option value={''}>Укажите категорию товара RU</option>
                {BD.map((el, index) => {
                    return <option key={index}
                                   value={el.nameRu}>
                        {el.nameRu}</option>
                })}
            </select>
            <input placeholder={'Введите название товара'}
                   value={name}
                   onChange={(e) => setName(e.target.value)}/>
            <input placeholder={'Введите цену товара'}
                   value={price}
                   onChange={(e) => setPrice(e.target.value)}/>
            <input placeholder={'Введити часы начала акции'}
                   value={promotionTimeStart}
                   onChange={(e) => setPromotionTimeStart(e.target.value)}/>
            <input placeholder={'Введити часы конца акции'}
                   value={promotionTimeFinish}
                   onChange={(e) => setPromotionTimeFinish(e.target.value)}/>
            <textarea placeholder={'Напишите описание товара'}
                      value={description}
                      onChange={e => setDescription(e.target.value)}/>
            <div className={classes.blockIsStop}>
                <span>
                    {isStop
                        ? 'Убрать из стоплиста'
                        : 'Поставить в стоплист'}
                </span>
                <input type={'checkbox'} checked={isStop} value={isStop} onClick={() => setIsStop(!isStop)}/>
            </div>
            <button onClick={removeData}>Удалить товар</button>
        </div>
    );
};

export default ProductEdit;