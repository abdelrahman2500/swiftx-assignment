import React, { useState } from 'react';
import HeaderNavigation from '../header-navigation/HeaderNavigation';
import './index.css'
import Logo from './../logo/Logo';
import NavbarActions from './../navbar-actions/NavbarActions';
import Modal from 'react-modal';
import Cart from '../../pages/cart/Cart';

Modal.setAppElement("#root")

export default function Navbar({data, cartLength, setCartLength, handleDelete, curr, setCurr, cartItems, setCartItems, handleAttr ,handleActiveAttrItem}) {
    const[modalIsOpen, setModalIsOpen]= useState(false)
    return(
        <div className='navbar'>
            <div className='navigation'>
                <div className='navigation__section'>
                    <HeaderNavigation data={data} />
                </div>
                <div className='navigation__section'>
                    <Logo />
                </div>
                <div className='navigation__section'>
                    <NavbarActions cartLength={cartLength} handleDelete={handleDelete} curr={curr} setCurr={setCurr} setModalIsOpen={setModalIsOpen} /> 
                </div>
            </div>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay:{
                        backgroundColor: "#39374838",
                    },
                    content:{
                        width : "325px",
                        left: "auto",
                        top: "80px",
                        right:"10%"
                    }
                }}
            >
                <Cart cartItems={cartItems} setCartItems={setCartItems} setCartLength={setCartLength} handleDelete={handleDelete} handleAttr={handleAttr} curr={curr} handleActiveAttrItem={handleActiveAttrItem} setModalIsOpen={setModalIsOpen} inModal={true}  incart={true}/>
            </Modal>  
        </div>
    )
}
