import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCurrency } from '../../hooks/useCurrency';
import './index.css'

export default function NavbarActions({curr, cartLength, setCurr, setModalIsOpen}) {
    const {error, data, loading} = useCurrency()

    const location = useLocation()


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return(
        <div className='navbar__actions'>
            <div className='currency'>
                <select value={curr} onChange={(e) => setCurr(e.target.value)}>
                    {data.currencies.map((currency) => (
                        <option key={currency.symbol} value={currency.symbol}>{`${currency.symbol} ${currency.label}`}</option>
                    ))}
                </select>
            </div>
            <div className='cart--icon' onClick={() => location.pathname != "/cart" && setModalIsOpen(true)}>
                <img src={"/images/icons/Vector.png"} />
                <span>{cartLength}</span>
            </div>
        </div>
    )
}
