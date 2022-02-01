import React, { memo, useState } from 'react';
import { useCartProducts } from '../../hooks/useCartProducts';
import './index.css'
import Attributes from './../attributes/Attributes';

function CartItem({cartItem,cartItems, setCartItems, handleDelete,  inModal, curr , handleActiveAttrItem}) {
    const {error, data, loading} = useCartProducts(cartItem.id)
    const[img,setImg] = useState(0)
    // const[active,setActive] = useState("")
    // const [attrId, setAttrValue] = useState("") 




    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    cartItems.slice().forEach((item) => {
        if(item.id === data.product.id){
            item.id = data.product.id
            item.name = data.product.name
            item.prices = data.product.prices
            item.attributes = data.product.attributes
            item.selectedAttributes = item.selectedAttributes
        }
    })

    // handle cart item count

    function handleIncreament(id){
        cartItems.map(el => el.id == id ? el.count++ : "")
        localStorage.setItem("cart", JSON.stringify(cartItems))
        setCartItems(JSON.parse(localStorage.getItem("cart")))
    }
    function handleDecreament(id){
        cartItems.map(el => el.id == id && el.count >1 ? el.count-- : "")
        localStorage.setItem("cart", JSON.stringify(cartItems))
        setCartItems(JSON.parse(localStorage.getItem("cart")))
    }

    return(
        <div className={`${inModal ? 'cart__item--modal' : 'cart__item'} `}>
            <button className='delete__btn' onClick={()=> handleDelete(data.product)}>X</button>
            <div className='cart__item--left'>
                <h3 className='cart__item--brand'>{data.product.brand}</h3>
                <h3 className='cart__item--name'>{data.product.name}</h3>
                <h5 className='cart__item--price'>
                    {data.product.prices.map((price, i) => price.currency.symbol == curr ? <p key={i}>{price.currency.symbol}{(price.amount * cartItem.count).toFixed(2)}</p> : "")}
                </h5>
                {data.product.attributes? data.product.attributes.map((attr, i) => (
                    <div className='cart__item--details--attributes' key={attr.id}>
                        <div className='attr--items'>
                            <Attributes attributesList={attr.items} attrId={attr.id} productId={data.product.id} handleActiveAttrItem={handleActiveAttrItem} selected={cartItem.selectedAttributes} incart={true} cartItems={cartItems} setCartItems={setCartItems} />
                        </div>
                    </div>
                ))
                :""
                }
            </div>
            <div className='cart__item--right'>
                <div className='cart__item--count'>
                    <button className='count__item--handleCount' onClick={() => handleIncreament(data.product.id)}>+</button>
                    <p className='cart__item--amount'>{cartItem.count}</p>
                    <button className='count__item--handleCount' onClick={() => handleDecreament(data.product.id)}>-</button>
                </div>
                <div className='cart__item--gallery'>
                    {data.product.gallery.length > 1 && <span className='before' onClick={()=> img != 0 && setImg(img-1)}>{`<`}</span>}
                    <img src={data.product.gallery[img]} alt={data.product.name} />
                    {data.product.gallery.length > 1 && <span className='after' onClick={()=> img < data.product.gallery.length-1 && setImg(img+1)}>{`>`}</span>}
                </div>
            </div>
        </div>
    ) ;
}


export default memo(CartItem)