import axios from "../axios";

export const sendData = async (data, url) => {
    try {
        const response = await axios.post(url, data);
        console.log('Произошла отправка запроса!', response.data);
    } catch (err) {
        console.warn('Произошла ошибка отправки запроса!', err);
    }
};

export const updateData = async (data, url) => {
    try {
        const response = await axios.patch(url, data);
        console.log('Произошла отправка запроса!', response.data);
    } catch (err) {
        console.warn('Произошла ошибка отправки запроса!', err);
    }
};