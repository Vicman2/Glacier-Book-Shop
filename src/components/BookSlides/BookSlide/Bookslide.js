import React from 'react' 
import './BookSlide.css'
import Aux from '../../../HOC/Aux'
import oneBook from '../../../bookish/Killing_Hemingway.png'



const BookSlide = (props) => {
    return(
        <Aux>
            <div className="BookSlide">
                <div className="BookSlide_Text">
                    <p className="BookSlide_Title"> {props.name} </p>
                    <p className="BookSlide_Quote"> {props.quote} </p>
                    <div className="BookSlide_CheckNow_Button">
                        <button>Check now</button>
                    </div>
                </div>
                <div className="BookSlide_Image">
                    <img src={oneBook} alt="" />
                </div>
            </div>
        </Aux>
    )
}


export default BookSlide