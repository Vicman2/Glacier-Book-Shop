import React from 'react'
import './BookInHome.css'
import { connect } from 'react-redux'


const BookInHome = (props) => {
    const src = props.imageEndPoint + props.imageUrl
    const titleCase = (str) => {
        let splitString = str.split(" ")
        for(let i = 0; i < splitString.length; i++){
            splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1)
        }
        return splitString.join(' ')
    }
    return(
        <div className="BookInHome">
            <section className="BookInHome_Image_Container">
                <img src={src} alt="" />
            </section>
            <section className="BookInHome_Detail">
                <p className="BookInHome_Title"> {titleCase(props.title)} </p>
                <p className="BookInHome_Author">{titleCase(props.author)} </p>
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