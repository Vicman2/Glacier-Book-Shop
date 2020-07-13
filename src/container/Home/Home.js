import React, {Component} from 'react'
import gql from 'graphql-tag'
import './Home.css'
import Aux from '../../HOC/Aux'
import BookSides from '../../components/BookSlides/BookSlides'
import { graphql } from 'react-apollo'
import BookCards from '../../components/BookCards/BookCards'
import BookInHome from '../../components/BookInHome/BookInHome'
import LatestBooks from '../../components/LatestBooks/LatestBooks'

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
    componentDidMount(){
        window.scrollTo(0, 0)
        if(this.props.data.getBooks){
            this.setState({books : this.props.data.getBooks})
        }

    }
    goToPreview = (id) => {
        this.props.history.push(`/product/${id}`)
    }
    render(){
        let booksToSlide = [];
        let booksForCard = [];
        let booksToDisplay = <div></div>;
        if(!this.props.data.loading){
            booksToSlide = this.state.books.filter((book, index) => index <15)
            booksToSlide = booksToSlide.reverse()
            booksForCard= this.state.books.filter((book, index) => index > 3 && index <=6)
            booksForCard = booksForCard.reverse()
            booksToDisplay =  this.state.books.map((book,index) => {
                return(
                    <BookInHome
                        clicked={() => this.goToPreview(book._id)}
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
                    <p className="Category_Title">Category</p>
                    <div className="Individual_Categories">
                        <div id="Science_Fiction">
                            <p>Science Fiction</p>
                        </div>
                        <div id="Fantasy">
                            <p>Fantasy</p>
                        </div>
                        <div id="Cooking">
                            <p>Cooking</p>
                        </div>
                        <div id="Business">
                            <p>Business</p>
                        </div>
                    </div>
                </div>
                <div className="Books_ForSale">
                    <div className="Pre_Book_Text">
                        <p>INTERESETING BOOKS THIS SEASON</p>
                        <p className="BookInHome_Title">Checkout what's NEW and what everyone else is READING!</p>
                    </div>
                    <div className="Our_Books">
                        {booksToDisplay}
                    </div>
                </div>
                <LatestBooks />
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