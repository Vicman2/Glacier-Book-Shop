import React from 'react'
import './LatestBook.css'
import { capitalizeFirstWord } from '../../../Util/stringHelperFunctions'
import {flowRight as compose} from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const LatestBook = (props) => {
    const src = props.imageEndPoint + props.imageUrl
    const clicked = () => {
        props.history.push(`/product/${props.id}`)
        window.scrollTo(0,0)
    }
    return(
        <div onClick={clicked} className="LatestBook">
            <div className="LatestB00k_Text_Button">
                <p className="LatestBook_Title"> {props.title.toUpperCase()} </p>
                <p className="LatestBook_Author"> {capitalizeFirstWord(props.author)} </p>
                <p>${props.price}</p>
                <div className="BookCard_Button Added_Button_Class">
                    <button onClick={() => props.history.push(`/product/${props.id}`)}>Buy now</button>
                </div>
            </div>
            <div className="LatestBook_Image_Container">
                <img src={src}  alt={props.title}/>
            </div>
        </div>
    )
}

const stateMappedToProps = state => {
    return {
        imageEndPoint: state.bookImageEndpoint
    }
}

export default compose(
    withRouter,
    connect(stateMappedToProps), 
)  (LatestBook)