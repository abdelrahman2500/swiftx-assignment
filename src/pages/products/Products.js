import React, { useEffect, useState } from 'react';
import { useProductsList } from '../../hooks/useProductsList';
import './index.css'
import ProductItem from './../../components/product-item/ProductItem';
import Pagination from './../../components/pagination/Pagination';

export default function Products({categoryName, curr, setCartLength, addToCart}) {
    const[page,setPage] = useState(1)
    const[itemsNumberInPage,setItemsNumberInPage] = useState(6)


    const {error, data, loading} = useProductsList()
    useEffect(() => {
        setPage(1)
        return ()=>{
            setPage(1)
        }
    },[categoryName])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className='products__page'>
            <h2 className='products__category--name'>{categoryName}</h2>
            <div className='products--list'>
                {data.categories.map((category) => category.name == categoryName ? 
                <div key={category.name}>
                    <div className='products__category--list' key={category.name}>
                        {category.products.map((product, i) => ( 
                            i >= (page-1) * itemsNumberInPage && i < page * itemsNumberInPage  ? 
                            <ProductItem product={ product} page={page} setPage={setPage} addToCart={addToCart} setCartLength={setCartLength} curr={curr} key={product.id} />
                            : ""
                        ))}
                        
                    </div>

                    {/* adding pagination by passing products list and how many products per page */}
                    <Pagination itemsList={category.products} itemsNumberInPage={itemsNumberInPage} page={page} setPage={setPage} />

                </div>
                    
                    
                    : ""
                ) }
            </div>
        </div>
    );
}
