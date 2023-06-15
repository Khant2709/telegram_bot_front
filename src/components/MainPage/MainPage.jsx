import React from 'react';
import classes from './MainPage.module.css';
import {useNavigate} from "react-router";

const MainPage = ({tokenAdmin}) => {

    const navigate = useNavigate();

    return (
        <div className={classes.MainBlock}>
            <div className={classes.logo}>
                <span onClick={() => navigate('/login')}>Lava</span><br/>
                <span>Lounge</span>
            </div>
            <div className={classes.item} onClick={() => navigate('/Menu')}>
                Открыть меню
            </div>
            <div className={classes.itemsList}>
                {
                    tokenAdmin
                        ? <>
                            <div className={classes.item} onClick={() => navigate('/EditCategory')}>
                                Создать новую категорию
                            </div>
                            <div className={classes.item} onClick={() => navigate('/AddProduct')}>
                                Создать новый товар
                            </div>
                            <div className={classes.item} onClick={() => navigate('/StopList')}>
                                Стоп лист
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