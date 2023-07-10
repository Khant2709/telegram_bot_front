import React, {useEffect, useRef, useState} from 'react';
import classes from '../../generalStyle/mainWithTitle.module.css';
import {useTelegram} from "../../hooks/useTelegram";
import useMainButtonEvent from "../../hooks/useMainButtonEvent";
import {sendData} from "../../unitFunction/onSendData";
import ButtonBack from "../generalComponents/ButtonBack/ButtonBack";

import {Toast} from 'primereact/toast';
import {InputText} from "primereact/inputtext";


const EditCategory = () => {

        const [name, setName] = useState('');
        const [nameRu, setNameRu] = useState('');
        const [error1, setError1] = useState(null);
        const [error2, setError2] = useState(null);
        const toast = useRef(null);

        const tokenAdmin = window.localStorage.getItem('tokenUser');
        const {tg, queryId} = useTelegram();

        const showError = (error) => {
            toast.current.show({severity: 'error', summary: 'Ошибка!', detail: `${error}`, life: 3000});
        }

        const onSendData = () => {
            const text = 'Введите корректно название ';

            if (!name.trim()) {
                setError1(text + ' в En');
                showError(text + ' в En');
            }

            if (!nameRu.trim()) {
                setError2(text + ' в Ru');
                showError(text + ' в Ru');
            }

            if(name.trim() && nameRu.trim()){
                sendData({queryId, name, nameRu, token: tokenAdmin}, '/addCategory')
                //Сделать проверку на бэке на пустоту и возвращать ошибку
            //И сделать при переходе назад отчищать поля и убирать кнопку ТГ
            }
        }

        useMainButtonEvent(tg, onSendData);
        useEffect(() => {
            if (name && nameRu) {
                tg?.MainButton.show();
                tg?.MainButton.setParams({
                    text: `Создать категорию`,
                });
            } else {
                tg?.MainButton.hide();
            }
        }, [tg, name, nameRu])

        return (
            <>
                <Toast ref={toast} className={"w-8"}/>

                <ButtonBack/>
                <div className={classes.main}>
                    <h2 className={classes.title}>
                        Создание новой категории
                    </h2>
                    <div className="card my-4 w-full">
                        <span className="p-float-label">
                            <InputText id="nameEn"
                                       value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       className={error1 ? "p-invalid border-3" : "m-0 w-full"}/>
                            <label htmlFor="nameEn">Введите название категории на EN</label>
                        </span>
                    </div>
                    <div className="card my-4 w-full">
                        <span className="p-float-label">
                            <InputText id="nameRu"
                                       value={nameRu}
                                       onChange={(e) => setNameRu(e.target.value)}
                                       className={error2 ? "p-invalid border-3" : "m-0 w-full"}/>
                            <label htmlFor="nameRu">Введите название категории на RU</label>
                        </span>
                    </div>
                </div>
            </>
        );
    }
;

export default EditCategory;