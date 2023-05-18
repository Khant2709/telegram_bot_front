import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';

import {useTelegram} from "./hooks/useTelegram";

import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import Menu from "./components/Menu/Menu";
import EditCategory from "./components/editMenu/editCategory";
import EditProduct from "./components/editMenu/editProduct";
import {checkIsAdmin, getAllCategory, getAllProducts} from "./api/initFunction";



function App() {

    const {tg, user} = useTelegram();

    useEffect( () => {
        //Этот метод показывает, что приложение полностью проинициализировалось и его можно отрисовывать
        tg.ready();
        getAllProducts();
        getAllCategory();
        checkIsAdmin(user.id);
    }, [])

    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/Menu/*'} element={<Menu/>}/>
                <Route path={'/EditCategory'} element={<EditCategory/>}/>
                <Route path={'/AddProduct'} element={<EditProduct/>}/>
            </Routes>
        </>
    );
}

export default App;
