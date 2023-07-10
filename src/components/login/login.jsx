import React, {useRef, useState} from 'react';
import classes from '../../generalStyle/mainWithTitle.module.css'
import axios from "../../axios";
import {useNavigate} from "react-router";

import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import ButtonBack from "../generalComponents/ButtonBack/ButtonBack";

const Login = ({id}) => {

    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const tokenAdmin = window.localStorage.getItem('tokenUser');

    const toast = useRef(null);

    const showError = (error) => {
        toast.current.show({severity: 'error', summary: 'Ошибка!', detail: `${error}`, life: 3000});
    }

    const sendData = () => {
        axios
            .post('/isAdmin', {id, password})
            .then((res) => {
                window.localStorage.setItem('tokenUser', res.data.tokenUser)
                navigate('/')
            })
            .catch(async (err) => {
                console.warn(err);
                await setError(err.response.data.message)
                await showError(err.response.data.message);
            })
    }

    const logout = () => {
        window.localStorage.removeItem('tokenUser');
        navigate('/');
    }

    return (
        <>
            <Toast ref={toast} className={"w-8"}/>
            <ButtonBack/>
            {tokenAdmin
                ? <div className={classes.main}>
                    <h2 className={classes.title}>Вы авторизированы</h2>
                    <Button label={"Выйти"}
                            className={"bg-blue-500 border-round-xl w-8 text-900 align-self-center"}
                            onClick={logout}/>
                </div>
                : <div className={classes.main}>
                    <h2 className={classes.title}>Авторизация</h2>
                    <div className="card my-6 w-full">
                        <span className="p-float-label">
                            <InputText id="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className={error ? "p-invalid w-full" : "w-full"}/>
                            <label htmlFor="password">Введите пароль:</label>
                        </span>
                    </div>
                    <Button label={"Авторизироваться"}
                            className={"bg-blue-500 border-round-xl w-8 text-900 align-self-center"}
                            onClick={sendData}
                            disabled={password.length === 0}/>
                </div>
            }
        </>
    );
};

export default Login;