import React from 'react'
import Aux from '../../../../HOC/Aux'
import './Search.css'

const SearchInput = (props)=> {
    return(
        <Aux>
            <div className="SearchInput">
                <form>
                    <input 
                    type="text" 
                    value={props.value} 
                    {...props.config}
                    onChange={props.changed}
                    />
                    <ion-icon name="search"></ion-icon>
                    <button type="submit" onClick={props.submit}>Search</button>
                </form>
            </div>
        </Aux>
    )
}

export default SearchInput