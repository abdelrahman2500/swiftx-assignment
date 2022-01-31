import React from 'react';
import './index.css'

export default function Pagination({itemsList, itemsNumberInPage, page, setPage}) {
    
    function handlePagination(i){
        setPage(i+1)
        window.scrollTo(0,0)
    }

    return(
        <div className='pagination'>
            {typeof itemsList == "object" ? itemsList.length ? typeof itemsNumberInPage == "number" ? itemsList.length > itemsNumberInPage ? 
                <div className='pagination__list'>
                {itemsList.map((_,i) => 
                    i < Math.ceil(itemsList.length / itemsNumberInPage) ? 
                    <span className={`pagination__item ${i+1 == page ? "active" : ""}`} key={i} onClick={()=> handlePagination(i)}>{i+1}</span>
                    :""
                )}
                </div>

            
            : "" : "" : "": ""}

        </div>
    ) ;
}
