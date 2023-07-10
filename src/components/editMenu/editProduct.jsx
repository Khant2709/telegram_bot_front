import React, {useEffect, useState} from 'react';
import classes from '../../generalStyle/mainWithTitle.module.css';
import {useTelegram} from "../../hooks/useTelegram";
import axios from "../../axios";
import useMainButtonEvent from "../../hooks/useMainButtonEvent";
import {sendData, updateData} from "../../unitFunction/onSendData";
import {useLocation} from "react-router-dom";

import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {Button} from 'primereact/button';
import {Checkbox} from "primereact/checkbox";
import {InputTextarea} from "primereact/inputtextarea";

import ButtonBack from "../generalComponents/ButtonBack/ButtonBack";


const EditProduct = ({product}) => {

    const [category, setCategory] = useState({});
    const [categoryRu, setCategoryRu] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [promotionTimeStart, setPromotionTimeStart] = useState('');
    const [promotionTimeFinish, setPromotionTimeFinish] = useState('');
    const [isStop, setIsStop] = useState(false);
    const [BD, setBD] = useState([]);


    const location = useLocation();
    const tokenAdmin = window.localStorage.getItem('tokenUser');
    const {tg, queryId} = useTelegram();
    const checkDate = product && location.pathname.split('/').length > 2

    useEffect(() => {
        axios
            .get('/allCategory')
            .then((res) => {
                setBD(res.data);
            })
            .catch((err) => {
                console.warn("Произошла ошибочка в БД", err)
            })
    }, [])

    useEffect(() => {
        if (checkDate && BD.length !== 0) {
            setCategory(BD.find(el => el.name === product?.category));
            setCategoryRu(BD.find(el => el.nameRu === product?.categoryRu));
            setName(product?.name);
            setPrice(product?.price);
            setIsStop(product.isStop);
            setPromotionTimeStart(product?.promotionTimeStart);
            setPromotionTimeFinish(product?.promotionTimeFinish);
            setDescription(product?.description)
        }
    }, [product, BD])

    const removeData = () => {

        const data = {
            queryId,
            token: tokenAdmin
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

    const onSendData = () => {
        checkDate
            ? updateData(
                {
                    id: product._id,
                    queryId,
                    category: category.name,
                    categoryRu: category.nameRu,
                    name,
                    description,
                    price,
                    promotionTimeStart,
                    promotionTimeFinish,
                    isStop,
                    token: tokenAdmin
                },
                '/updateProduct')
            : sendData(
                {
                    queryId,
                    category: category.name,
                    categoryRu: category.nameRu,
                    name,
                    description,
                    price,
                    promotionTimeStart,
                    promotionTimeFinish,
                    isStop,
                    token: tokenAdmin
                },
                '/addProduct');
    }

    useMainButtonEvent(tg, onSendData);

    useEffect(() => {
        if (category && categoryRu && name.trim() && price) {
            tg?.MainButton.show();
            tg?.MainButton.setParams({
                text: checkDate ? 'Обновить товар' : `Создать товар`,
            });
        } else {
            tg?.MainButton.hide();
        }
    }, [tg, category, categoryRu, name, price])

    return (
        <>
            {!checkDate && <ButtonBack/>}
            <div className={classes.main}>
                <h2 className={classes.title}>
                    {checkDate ? name : 'Создание нового товара'}
                </h2>
                <span className="p-float-label mb-5">
                    <Dropdown inputId="nameEn"
                              value={category}
                              onChange={(e) => setCategory(e.value)}
                              options={BD}
                              optionLabel="name"
                              className="w-full md:w-14rem "/>
                    <label htmlFor="nameEn">Укажите категорию товара EN</label>
                </span>
                <span className="p-float-label mb-5">
                    <Dropdown inputId="nameRu"
                              value={categoryRu}
                              onChange={(e) => setCategoryRu(e.value)}
                              options={BD}
                              optionLabel="nameRu"
                              className="w-full md:w-14rem "/>
                    <label htmlFor="nameRu">Укажите категорию товара RU</label>
                </span>
                <div className="card mb-5 w-full">
                        <span className="p-float-label">
                            <InputText id="name"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       className={"w-full"}/>
                            <label htmlFor="name">Введите название товара:</label>
                        </span>
                </div>
                <div className="card mb-5 w-full">
                        <span className="p-float-label">
                            <InputText id="price"
                                       keyfilter="int"
                                       value={price}
                                       onChange={(e) => setPrice(e.target.value)}
                                       className={"w-full"}/>
                            <label htmlFor="price">Введите цену товара:</label>
                        </span>
                </div>
                <div className="card mb-5 w-full">
                        <span className="p-float-label">
                            <InputText id="promotionTimeStart"
                                       keyfilter="int"
                                       value={promotionTimeStart}
                                       onChange={(e) => setPromotionTimeStart(e.target.value)}
                                       className={"w-full"}/>
                            <label htmlFor="promotionTimeStart">Введити часы начала акции:</label>
                        </span>
                </div>
                <div className="card mb-5 w-full">
                        <span className="p-float-label">
                            <InputText id="promotionTimeFinish"
                                       keyfilter="int"
                                       value={promotionTimeFinish}
                                       onChange={(e) => setPromotionTimeFinish(e.target.value)}
                                       className={"w-full"}/>
                            <label htmlFor="promotionTimeFinish">Введити часы конца акции:</label>
                        </span>
                </div>
                <span className="p-float-label w-full h-10rem mb-5">
                        <InputTextarea id="description"
                                       autoResize
                                       value={description}
                                       onChange={(e) => setDescription(e.target.value)}
                                       className={"w-full h-10rem"}/>
                    <label htmlFor="description">Введите описание</label>
                    </span>
                <div className="card flex justify-content-around">
                        <span>
                    {isStop
                        ? 'Убрать из стоплиста'
                        : 'Поставить в стоплист'}
                    </span>
                    <Checkbox onChange={() => setIsStop(!isStop)}
                              checked={isStop}> </Checkbox>
                </div>
                {product && <Button label="Удалить товар"
                                    severity="danger"
                                    onClick={removeData}
                                    className={"mt-5 h-4rem"}/>}
            </div>
        </>
    );
};

export default EditProduct;