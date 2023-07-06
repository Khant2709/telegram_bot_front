import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ProductShow from "./ProductShow";
import EditProduct from "../../editMenu/editProduct";

const Product = ({tokenAdmin, menuList}) => {

    const params = useParams();

    const [currentProduct, setCurrentProduct] = useState({});

    useEffect(() => {
        const product = menuList.find(el => el._id === Object.values(params).join());
        setCurrentProduct(product);
    }, [])

    return (
        <>
            {tokenAdmin
                ? <EditProduct product={currentProduct} tokenAdmin={tokenAdmin}/>
                : <ProductShow product={currentProduct}/>
            }
        </>
    );
};

export default Product;