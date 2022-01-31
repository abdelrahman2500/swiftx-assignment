import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Attributes from '../../components/attributes/Attributes';
import { useProductInfo } from '../../hooks/useProductInfo';
import PageNotFound from '../page-not-found/PageNotFound';
import './index.css'

export default function Product({curr, addToCart, handleActiveAttrItem}) {
    const params = useParams()
    const {error, data, loading} = useProductInfo(params.productId)
    // console.log(data);
    // const {product} = data
    const [gallery, setGallery] = useState([]) 
    

    useEffect(()=>{
        data && data.product && setGallery(data.product.gallery)
    },[data])

    function handleGallery(e){
        let newG2 = []
        newG2.push(e.target.currentSrc)
        let newG = data.product.gallery.filter(el => el != e.target.currentSrc )
        newG2 = [...newG2, ...newG]
        setGallery(newG2)
    }

    // console.log(gallery);

    // function handleAttr(e,attr,attrParentId,productId){

    //     setAttrId(e.target.innerHTML)
    //     setAttrParentId(attrParentId)
    //     setProductId(productId)
    // }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    // if (data) return <p>Error :(</p>;

    return (
        <div className='product__page'>
        {data.product != null ? 
        <>
        <div className='product__image'>
                {gallery.length != 1 ? 
                    <div className='left'>
                        {gallery.map((img, i)=> ( i > 0 ? 
                            <div className='product__image--thumbnail' key={i}>
                                <img src={img} onClick={(e)=> handleGallery(e)} alt={data.product.name} />
                            </div>
                            : ""
                        ))}
                    </div>
                : ""
                }
                <div className='right'>
                    <div className='product__image--display'>
                        <img src={gallery[0]} alt={data.product.name} />
                    </div>
                </div>
            </div>
            <div className='product__details'>
                {data.product.brand ? <h3 className='product__details--barnd'>{data.product.brand}</h3> : ""}
                <h4 className='product__details--name'>{data.product.name}</h4>
                {data.product.attributes? data.product.attributes.map((attr, i) => (
                    <div className='product__details--attributes' key={attr.id}>
                        <h4 className='attr--name'>{attr.name} :</h4>
                        <div className='attr--items'>
                            <Attributes handleActiveAttrItem={handleActiveAttrItem} attributesList={attr.items} productId={data.product.id} attrId={attr.id} incart={false} />
                        </div>
                    </div>
                ))
                :""
                }
                <h4 className='product__price'>
                    Price :
                    {data.product.prices.map((price, i) => price.currency.symbol == curr ? <p key={i}>{price.currency.symbol}{price.amount}</p> : "")}
                </h4>
                <div className='add-to-cart'>
                    <button className='' onClick={()=> addToCart(data.product)}>add to cart</button>
                </div>
                {data.product.description ? 
                    <div dangerouslySetInnerHTML={{__html: data.product.description}} />
                :""
                }
            </div>
        </>
        : <PageNotFound />}
        </div>
    );
}
