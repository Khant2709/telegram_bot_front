import React, {useEffect, useState} from 'react';
import classes from './Menu.module.css';
import {Route, Routes, useNavigate} from "react-router";
import NavBar from "./NavBar/NavBar";
import MenuItem from "./MenuItem/MenuItem";
import basketImg from '../../img/basket.png';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import MenuAdmin from "./MenuItem/MenuAdmin";
import Product from "./Product/Product";
import ButtonBack from "../ButtonBack/ButtonBack";


const Menu = () => {

    const navigate = useNavigate();
    const params = useParams();
    const tokenAdmin = window.localStorage.getItem('tokenUser');

    const [totalPrice, setTotalPrice] = useState(0);
    const [countItem, setCountItem] = useState(0);

    const {menuList, categoryList, addedProductList} = useSelector((state) => state.menu);

    const categoryMap = categoryList.reduce((state, el) => {
        state[el.name] = {
            dataList: menuList?.filter(item => item.category === el.name),
            myKey: el.name
        };
        return state;
    }, {basket: { dataList: addedProductList, myKey: 'basket' }});

    const { dataList, myKey } = categoryMap[Object.values(params).join().split('/')[0]] || {};

    useEffect(() => {
        const mainPrice = addedProductList.reduce((total, el) => total + el.price * el.count, 0);
        setTotalPrice(mainPrice);

        const mainCount = addedProductList.reduce((total, el) => total + el.count, 0);
        setCountItem(mainCount);

    }, [addedProductList])


    const linkTo = [...new Set(Object.values(menuList).flat().map(el => el.category))];
    const category = [...new Set(Object.values(menuList).flat().map(el => el.categoryRu))];

    return (
        <div>
            <div className={classes.header}>
                <ButtonBack/>
                <div className={classes.headerRight} onClick={() => navigate('basket')}>
                    <span>
                        {totalPrice} р
                    </span>
                    <img src={basketImg}/>
                    <span className={classes.iconBasket}>
                        {countItem}
                    </span>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<NavBar category={category} linkTo={linkTo}/>}/>
                <Route path={`${myKey}/*`} element={
                    <Product tokenAdmin={tokenAdmin}
                             menuList={menuList}
                    />}/>
                <Route path={myKey} element={
                    tokenAdmin
                        ? <MenuAdmin dataList={dataList} menuList={menuList}/>
                        : <MenuItem dataList={dataList}
                                    myKey={myKey}
                                    menuList={menuList}
                                    addedProductList={addedProductList}
                                    totalPrice={totalPrice}/>
                }/>
            </Routes>
        </div>
    );
};

export default Menu;