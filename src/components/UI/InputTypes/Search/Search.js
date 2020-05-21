import React from 'react'
import Aux from '../../../../HOC/Aux'
import './Search.css'

const SearchInput = (props)=> {
    return(
        <Aux>
            <div className="SearchInput">
                <input type="text" value=""/>
                <ion-icon name="search"></ion-icon>
                <button>Search</button>
            </div>
        </Aux>
    )
}

export default SearchInput