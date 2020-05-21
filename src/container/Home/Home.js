import React, {Component} from 'react'
import './Home.css'
import Aux from '../../HOC/Aux'
import BookSlide from '../../components/BookSlides/BookSlide/Bookslide'
import BookSides from '../../components/BookSlides/BookSlides'

class Home extends Component{
    render(){
        return(
            <Aux>
                <BookSides />
            </Aux>
        )
    }
}

export default Home