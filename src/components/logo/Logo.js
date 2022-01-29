import React from 'react';
import './index.css'
import { Link } from 'react-router-dom';

export default function Logo() {
    return(
        <div className='logo'>
            <Link to="/all">
                <img src="/images/logo/a-logo.png" />
            </Link>
        </div>
    )
}