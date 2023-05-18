import axios from "../axios";
import {updateCategory, updateMenu, checkAdmin} from "../Redux/Slices/Menu";
import {useDispatch} from "react-redux";

const dispatch = useDispatch();

export const getAllProducts = () => {
    axios
        .get('/allProducts')
        .then((res) => {
            console.log('Получение всех товаров', res.data)
            dispatch(updateMenu(res.data))
        })
        .catch((err) => {
            console.warn("Товары не получены", err)
        })
}

export const getAllCategory = () => {
    axios
        .get('/allCategory')
        .then((res) => {
            console.log('Получение всех категорий', res.data)
            dispatch(updateCategory(res.data))
        })
        .catch((err) => {
            console.warn("Категории не получены", err)
        })
}

export const checkIsAdmin = (id) => {
    axios
        .post('/isAdmin', {id})
        .then((res) => {
            console.log(res.data)
            dispatch(checkAdmin(res.data));
        })
        .catch((err) => {
            console.warn(err)
        })
}