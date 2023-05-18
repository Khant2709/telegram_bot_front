import React, {useEffect, useState} from 'react';
import ProductEdit from "./ProductEdit";
import {useParams} from "react-router-dom";
import ProductShow from "./ProductShow";

const Product = ({isAdmin, menuList}) => {

    const params = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

    useEffect(() => {
        const product = menuList.find(el => el._id === Object.values(params).join());
        setCurrentProduct(product);
    }, [])

    return (
        <>
            {isAdmin
                ? <ProductEdit product={currentProduct}/>
                : <ProductShow product={currentProduct}/>
            }
        </>
    );
};

export default Product;