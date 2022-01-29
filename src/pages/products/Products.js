import React from 'react';
import { useProductsList } from '../../hooks/useProductsList';
import './index.css'
import ProductItem from './../../components/product-item/ProductItem';

export default function Products({productName, curr, setCartLength, addToCart}) {
    const {error, data, loading} = useProductsList()
    console.log(error, data, loading);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className='products__page'>
            <h2 className='products__category--name'>{productName}</h2>
            <div className='products--list'>
                {data.categories.map((category) => category.name == productName ? 
                    <div className='products__category--list' key={category.name}>
                        {category.products.map((product) => (
                            <ProductItem product={ product} addToCart={addToCart} setCartLength={setCartLength} curr={curr} key={product.id} />
                        ))}
                        
                    </div>
                    
                    : ""
                ) }
            </div>
        </div>
    );
}
