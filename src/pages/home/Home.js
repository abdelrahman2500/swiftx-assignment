import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../products/Products';

export default function Home() {
    const navigate = useNavigate()

    useEffect(()=> {
        navigate('/all')
    },[])
    return <div>
        <Products />
    </div>;
}
