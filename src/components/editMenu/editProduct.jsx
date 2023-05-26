import React, {useEffect, useState} from 'react';
import classes from './editCategory.module.css'
import back from "../../img/back.png";
import {useNavigate} from "react-router";
import {useTelegram} from "../../hooks/useTelegram";
import axios from "../../axios";
import useMainButtonEvent from "../../hooks/useMainButtonEvent";
import {sendData} from "../../unitFunction/onSendData";


const EditProduct = () => {

    const [category, setCategory] = useState('');
    const [categoryRu, setCategoryRu] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [promotionTimeStart, setPromotionTimeStart] = useState('');
    const [promotionTimeFinish, setPromotionTimeFinish] = useState('');
    const [isStop, setIsStop] = useState(false);
    const [BD, setBD] = useState([]);


    const navigate = useNavigate();
    const {tg, queryId} = useTelegram();

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
    }, [])

    useEffect(() => {
        categoryRu && setCategory(BD.find(el => el.nameRu === categoryRu).name);
    }, [categoryRu])

    const onSendData = () => {
        sendData(
            {
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
            '/addProduct');
    }

    useMainButtonEvent(tg, onSendData);

    useEffect(() => {
        if (category && categoryRu && name && price) {
            tg?.MainButton.show();
            tg?.MainButton.setParams({
                text: `Создать категорию`,
            });
        } else {
            tg?.MainButton.hide();
        }
    }, [tg, category, categoryRu, name, price])

    return (
        <>
            <div className={classes.header}>
                <img src={back} onClick={() => navigate(-1)}/>
            </div>
            <div className={classes.mainBlock}>
                <h2 className={classes.title}>
                    Создание нового товара
                </h2>
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
            </div>
        </>
    );
};

export default EditProduct;