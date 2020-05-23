import React from 'react'
import './BookInHome.css'
import { connect } from 'react-redux'
import { capitalizeFirstWord } from '../../Util/stringHelperFunctions'


const BookInHome = (props) => {
    const src = props.imageEndPoint + props.imageUrl
  
    return(
        <div className="BookInHome">
            <section className="BookInHome_Image_Container">
                <img src={src} alt="" />
            </section>
            <section className="BookInHome_Detail">
                <p className="BookInHome_Title"> {capitalizeFirstWord (props.title)} </p>
                <p className="BookInHome_Author">{capitalizeFirstWord(props.author)} </p>
            </section>
        </div>
    )
}
const stateMappedToProps = (state) => {
    return{
        imageEndPoint: state.bookImageEndpoint
    }
}

export default connect(stateMappedToProps) (BookInHome)