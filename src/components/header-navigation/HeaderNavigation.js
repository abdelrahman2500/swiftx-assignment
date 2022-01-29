import React from 'react';
import './index.css'
import { useCategoriesNames } from './../../hooks/useCategoriesNames';
import { NavLink } from 'react-router-dom';

export default function HeaderNavigation({data}) {


    return(
        <div className='header__navigation'>
            <ul className=''>
            {data.categories.map((category ,i)=> ( 
                <li key={category.name}>
                    <NavLink to={`/${category.name}`}>
                        {category.name}
                    </NavLink>
                </li>
            ))}
            </ul>
        </div>
    )
}