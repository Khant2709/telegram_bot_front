import React from 'react';
import classes from './MainPage.module.css';
import {useNavigate} from "react-router";

const MainPage = ({tokenAdmin, admin}) => {

    const navigate = useNavigate();
    const block = admin === 1202872433 || admin === 876552997 || admin === 673218983

    return (
        <div className={classes.MainBlock}>
            <div className={classes.logo}>
                <span onClick={() => navigate('/login')}>Lava</span><br/>
                <span>Lounge</span>
            </div>
            <div className={classes.item} onClick={() => navigate('/Menu')}>
                Открыть меню
            </div>
            {
                block && <div className={classes.item} onClick={() => navigate('/Reservation')}>
                    {tokenAdmin ? 'Управление бронями' : 'Збронировать стол'}
                </div>
            }
            <div className={classes.itemsList}>
                {
                    tokenAdmin &&
                         <>
                            <div className={classes.item} onClick={() => navigate('/EditCategory')}>
                                Создать новую категорию
                            </div>
                            <div className={classes.item} onClick={() => navigate('/AddProduct')}>
                                Создать новый товар
                            </div>
                            <div className={classes.item} onClick={() => navigate('/StopList')}>
                                Стоп лист
                            </div>
                            <div className={classes.item} onClick={() => navigate('/PushPromotion')}>
                                Рассылка
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default MainPage;