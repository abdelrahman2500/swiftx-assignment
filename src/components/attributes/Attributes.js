import React, { useState } from 'react';

export default function Attributes({attributesList , productId, attrId, handleActiveAttrItem ,selected, incart, cartItems ,setCartItems }) {
    const [attrItemValue, setAttrItemValue] = useState("") 

    function handleAttr(e,item){
        if(incart) {
            let currentItem = cartItems.find(item => item.id == productId)
            if(currentItem.selectedAttributes.length == 0) {
                currentItem.selectedAttributes = {
                    id: productId,
                    attributes: [{
                        attrId: attrId,
                        itemId: item.id
                    }]
                }
            } else {
                if(currentItem.selectedAttributes.id == productId && currentItem.selectedAttributes.attributes.find(el => el.attrId == attrId && el.itemId == item.id) ){
                    currentItem.selectedAttributes.attributes.itemId = item.id
                }else if(
                    currentItem.selectedAttributes.id == productId && 
                    currentItem.selectedAttributes.attributes.find(el => el.attrId == attrId)) {
                    currentItem.selectedAttributes.attributes.find(el => el.attrId == attrId).itemId = item.id
                } else {
                    currentItem.selectedAttributes.attributes.push({
                        attrId: attrId,
                        itemId: item.id
                    })
                }
            }
            
            cartItems.filter(cartItem => cartItem.id == currentItem.id).push(...cartItems, currentItem)
            setCartItems(cartItems)
            localStorage.setItem("cart", JSON.stringify(cartItems))
            // setCartItems(JSON.parse(localStorage.getItem("cart")))
            // console.log(selected?.attributes.find(el => el?.attrId == attrId)?.attrId == attrId);
        }


        // console.log(cartItems);
        setAttrItemValue(e.target.innerHTML)
        handleActiveAttrItem(productId,attrId,item.id)
    }
    return(
        <>
            {attributesList.map((item, i)=>(
                <span className={`attr--item ${ attrItemValue == item.displayValue ? "active" : selected && productId && attrId && selected.id == productId && selected.attributes.find(el => el.attrId == attrId && el.itemId == item.id)  ? "active" : ""  } `} key={item.id} onClick={(e) => handleAttr(e, item)}>{item.displayValue}</span>
            ))}
        </>
    );
}
