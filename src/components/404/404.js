import React from 'react'
import notFoundSVG from '../404/Assets/404.svg'
import '../404/404.css'


const NotFound = (props) => {
    return(
        <div>
            <div className="Wrapper_SVG">
                <img src={notFoundSVG} alt="404" />
            </div>
            <p className="Wrapper_SVG_Text" onClick={() => props.history.push('/')}>To home </p>
        </div>
    )
}



export default NotFound