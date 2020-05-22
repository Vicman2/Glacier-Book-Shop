import React from 'react'
import  './BookCard.css'
import { connect } from 'react-redux'



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
                    <button>Buy now</button>
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


export default connect(stateMappedToProps)(BookCard)