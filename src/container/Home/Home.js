import React, {Component} from 'react'
import gql from 'graphql-tag'
import './Home.css'
import Aux from '../../HOC/Aux'
import BookSides from '../../components/BookSlides/BookSlides'
import { graphql } from 'react-apollo'
import BookCards from '../../components/BookCards/BookCards'
import BookInHome from '../../components/BookInHome/BookInHome'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            books : []
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.data.getBooks !== this.props.data.getBooks){
           this.setState({books :this.props.data.getBooks }) 
        }
    }
    render(){
        let booksToSlide = [];
        let booksForCard = [];
        let totalBook = []
        let booksToDisplay = <div></div>;
        if(!this.props.data.loading){
            booksToSlide = this.state.books.filter((book, index) => index <15)
            booksToSlide = booksToSlide.reverse()
            booksForCard= this.state.books.filter((book, index) => index > 3 && index <=6)
            booksForCard = booksForCard.reverse()
            totalBook = [...this.state.books];
            booksToDisplay =  this.state.books.map((book,index) => {
                return(
                    <BookInHome
                        key={book._id}
                        imageUrl={book.imageUrl}
                        title={book.title}
                        author={book.author.name}
                    />
                )
            })
        }

        return(
            <Aux>
                <BookSides booksToSlide={booksToSlide}/>
                <BookCards books={booksForCard} />
                <div className="Category">
                    <p>Category</p>
                    <div className="Category_Image_Container">
                       <h1>  </h1>
                    </div>
                </div>
                <div className="Our_Books">
                    {booksToDisplay}
                </div>
            </Aux>
        )
    }
}

const getBooks = gql`
    {
        getBooks{
        _id
        title
        description
        imageUrl
        price
        author{
            name
        }
        }
    }
`

export default graphql(getBooks) (Home)