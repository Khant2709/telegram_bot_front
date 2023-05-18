import React from 'react';
import classes from './MainPage.module.css';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

const MainPage = () => {

    const navigate = useNavigate();
    const {isAdmin} = useSelector((state) => state.menu);


    return (
        <div className={classes.MainBlock}>
            <div className={classes.logo}>
                <span>Lava</span><br/>
                <span>Lounge</span>
            </div>
            <div className={classes.item} onClick={() => navigate('/Menu')}>
                Открыть меню
            </div>
            <div className={classes.itemsList}>
                {
                    isAdmin
                        ? <>
                            <div className={classes.item} onClick={() => navigate('/EditCategory')}>
                                Создать новую категорию
                            </div>
                            <div className={classes.item} onClick={() => navigate('/AddProduct')}>
                                Создать новый товар
                            </div>
                        </>
                        : <div className={classes.item}>
                            Хочу забронировать стол
                          </div>
                }
            </div>
        </div>
    );
};

export default MainPage;