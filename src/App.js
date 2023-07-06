import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';

import {useTelegram} from "./hooks/useTelegram";

import MainPage from "./components/MainPage/MainPage";
import Login from "./components/login/login";
import PushPromotion from "./components/PushPromotion/PushPromotion";
import Menu from "./components/Menu/Menu";
import EditCategory from "./components/editMenu/editCategory";
import EditProduct from "./components/editMenu/editProduct";
import StopList from "./components/StopList/StopList";
import axios from "./axios";
import {updateCategory, updateMenu} from "./Redux/Slices/Menu";
import {useDispatch} from "react-redux";
import {sendData} from "./unitFunction/onSendData";
import Reservation from "./components/reservation/Reservation";
import AddReservation from "./components/reservation/AddReservation";


function App() {

    const {tg, user} = useTelegram();
    const dispatch = useDispatch();

    useEffect(() => {
        //Этот метод показывает, что приложение полностью проинициализировалось и его можно отрисовывать
        tg.ready();

        sendData({
            userId : user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username
        },'/saveUser')

        axios
            .get('/allProducts')
            .then((res) => {
                dispatch(updateMenu(res.data))
            })
            .catch((err) => {
                console.warn("Товары не получены", err)
            })

        axios
            .get('/allCategory')
            .then((res) => {
                dispatch(updateCategory(res.data))
            })
            .catch((err) => {
                console.warn("Категории не получены", err)
            })
    }, [])

    return (
        <Routes>
            <Route path={'/'} element={<MainPage/>}/>
            <Route path={'/login'} element={<Login id={user.id}/>}/>
            <Route path={'/PushPromotion'} element={<PushPromotion/>}/>
            <Route path={'/Menu/*'} element={<Menu/>}/>
            <Route path={'/EditCategory'} element={<EditCategory/>}/>
            <Route path={'/AddProduct/*'} element={<EditProduct/>}/>
            <Route path={'/StopList'} element={<StopList/>}/>
            <Route path={'/Reservation'} element={<Reservation/>}/>
            <Route path={'/AddReservation'} element={<AddReservation/>}/>
        </Routes>
    );
}

export default App;
