import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';

import {useTelegram} from "./hooks/useTelegram";

import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import Menu from "./components/Menu/Menu";
import EditCategory from "./components/editMenu/editCategory";
import EditProduct from "./components/editMenu/editProduct";
import StopList from "./components/StopList/StopList";
import axios from "./axios";
import {checkAdmin, updateCategory, updateMenu} from "./Redux/Slices/Menu";
import {useDispatch} from "react-redux";



function App() {

    const {tg, user} = useTelegram();
    const dispatch = useDispatch();

    useEffect( () => {
        //Этот метод показывает, что приложение полностью проинициализировалось и его можно отрисовывать
        tg.ready();
        const id = user.id;

        axios
            .get('/allProducts')
            .then((res) => {
                console.log('Получение всех товаров', res.data)
                dispatch(updateMenu(res.data))
            })
            .catch((err) => {
                console.warn("Товары не получены", err)
            })

        axios
            .get('/allCategory')
            .then((res) => {
                console.log('Получение всех категорий', res.data)
                dispatch(updateCategory(res.data))
            })
            .catch((err) => {
                console.warn("Категории не получены", err)
            })

        axios
            .post('/isAdmin', {id})
            .then((res) => {
                console.log(res.data)
                dispatch(checkAdmin(res.data));
            })
            .catch((err) => {
                console.warn(err)
            })
    }, [])

    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/Menu/*'} element={<Menu/>}/>
                <Route path={'/EditCategory'} element={<EditCategory/>}/>
                <Route path={'/AddProduct'} element={<EditProduct/>}/>
                <Route path={'/StopList'} element={<StopList/>}/>
            </Routes>
        </>
    );
}

export default App;
