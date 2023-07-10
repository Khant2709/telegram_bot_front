import React from 'react';
import classes from './MainPage.module.css';
import itemClasses from '../../generalStyle/item.module.css'
import classesMain from '../../generalStyle/mainWithTitle.module.css'
import {useNavigate} from "react-router";

const MainPage = () => {

    const navigate = useNavigate();
    const tokenAdmin = window.localStorage.getItem('tokenUser');

    return (
        <div className={classesMain.main}>
            <div className={classes.logo}>
                <span onClick={() => navigate('/login')}>Lava</span><br/>
                <span>Lounge</span>
            </div>
            <div className={itemClasses.item} onClick={() => navigate('/Menu')}>
                Открыть меню
            </div>
            <div className={itemClasses.item} onClick={() => navigate('/Reservation')}>
                {tokenAdmin ? 'Управление бронями' : 'Забронировать стол'}
            </div>
            {
                tokenAdmin &&
                <>
                    <div className={itemClasses.item} onClick={() => navigate('/EditCategory')}>
                        Создать новую категорию
                    </div>
                    <div className={itemClasses.item} onClick={() => navigate('/AddProduct')}>
                        Создать новый товар
                    </div>
                    <div className={itemClasses.item} onClick={() => navigate('/StopList')}>
                        Стоп лист
                    </div>
                    <div className={itemClasses.item} onClick={() => navigate('/PushPromotion')}>
                        Рассылка
                    </div>
                </>
            }
        </div>
    );
};

export default MainPage;