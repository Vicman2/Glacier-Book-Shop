import React from 'react'
import './LatestBook.css'
import { capitalizeFirstWord } from '../../../Util/stringHelperFunctions'
import { connect } from 'react-redux'

const LatestBook = (props) => {
    const src = props.imageEndPoint + props.imageUrl
    return(
        <div className="LatestBook">
            <div className="LatestB00k_Text_Button">
                <p className="LatestBook_Title"> {props.title.toUpperCase()} </p>
                <p className="LatestBook_Author"> {capitalizeFirstWord(props.author)} </p>
                <p>${props.price}</p>
                <div className="BookCard_Button Added_Button_Class">
                    <button>Buy now</button>
                </div>
            </div>
            <div className="LatestBook_Image_Container">
                <img src={src} />
            </div>
        </div>
    )
}

const stateMappedToProps = state => {
    return {
        imageEndPoint: state.bookImageEndpoint
    }
}

export default connect(stateMappedToProps) (LatestBook)