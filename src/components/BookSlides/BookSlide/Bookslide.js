import React from 'react' 
import './BookSlide.css'
import Aux from '../../../HOC/Aux'
import { connect } from 'react-redux'



const BookSlide = (props) => {
    const src = props.imageEndpoint + props.imageUrl
    return(
        <Aux>
            <div className="BookSlide">
                <div className="BookSlide_Text">
                    <p className="BookSlide_Title"> {props.name.toUpperCase()} </p>
                    <p className="BookSlide_Quote"> {props.quote} </p>
                    <div className="BookSlide_CheckNow_Button">
                        <button>Check now</button>
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


export default connect (stateMapedToProps) (BookSlide)