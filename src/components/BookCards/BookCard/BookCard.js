import React from 'react'
import  './BookCard.css'
import { connect } from 'react-redux'
import {flowRight as compose} from 'lodash'
import { withRouter } from 'react-router-dom'



const BookCard = (props) => {
    const deSource = props.imageEndPoint + props.imageUrl
    return (
        <div className="BookCard">
            <div className="BookCard_Image_Container">
                <img src={deSource} alt={props.title}/>
            </div>
            <div className="BookCard_Content">
                <div className="BookCard_Rating">
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                </div>
                <p> {props.title.toUpperCase()} </p>
                <p>${props.price} </p>
                <div className="BookCard_Button">
                    <button onClick={()=> props.history.push(`/product/${props.id}`)}>Buy now</button>
                </div>
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
    connect(stateMappedToProps)
) (BookCard)