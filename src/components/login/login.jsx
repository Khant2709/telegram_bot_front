import React, {useState} from 'react';
import classes from './login.module.css'
import axios from "../../axios";
import {useNavigate} from "react-router";

const Login = ({id, tokenAdmin}) => {

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const sendData = () => {
        axios
            .post('/isAdmin', {id, password})
            .then((res) => {
                window.localStorage.setItem('tokenUser', res.data.tokenUser)
                navigate('/')
            })
            .catch((err) => {
                console.warn(err)
                setError(err.response.data.message)
            })
    }

    const logout = () => {
        window.localStorage.removeItem('tokenUser');
        navigate('/');
    }

    return (
        <>
            {tokenAdmin
                ? <div className={classes.main}>
                    <h2>Вы авторизированы</h2>
                    <button className={classes.btn} onClick={logout} >Выйти</button>
                </div>
                : <div className={classes.main}>
                    <h2>Введите пароль:</h2>
                    <div className={classes.mainBlock}>
                        <input value={password} onChange={(e) => setPassword(e.target.value)}/>
                        {error && <span>{error}</span>}
                    </div>
                    <div className={classes.buttons}>
                        <button className={classes.btn} onClick={() => navigate(-1)}>Назад</button>
                        <button className={classes.btn} onClick={sendData} disabled={password.length === 0}>Войти</button>
                    </div>
                </div>
            }
        </>
    )
        ;
};

export default Login;