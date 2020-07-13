import React from 'react' 
import './BookSlide.css'
import Aux from '../../../HOC/Aux'
import { connect } from 'react-redux'
import {flowRight as compose} from 'lodash'
import { withRouter } from 'react-router-dom'



const BookSlide = (props) => {
    const src = props.imageEndpoint + props.imageUrl
    return(
        <Aux>
            <div onClick={() => props.history.push(`/product/${props.id}`)} className="BookSlide">
                <div className="BookSlide_Text">
                    <p className="BookSlide_Title"> {props.name.toUpperCase()} </p>
                    <p className="BookSlide_Quote"> {props.quote} </p>
                    <div className="BookSlide_CheckNow_Button">
                        <button onClick={() => props.history.push(`/product/${props.id}`)}>Check now</button>
                    </div>
                </div>
                <div className="BookSlide_Image">
                    <img src={src} alt="" />
                </div>
            </div>
        </Aux>
    )
}

const stateMapedToProps = (state)=> {
    return {
        imageEndpoint: state.bookImageEndpoint
    }
}


export default compose(
    withRouter,
    connect (stateMapedToProps) 
) (BookSlide)