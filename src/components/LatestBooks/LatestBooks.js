import React from 'react'
import gql from 'graphql-tag'
import './LatestBooks.css'
import { graphql } from 'react-apollo'
import LatestBook from './LatestBook/LatestBook'
import Aux from '../../HOC/Aux'


const LatestBooks = (props) => {

    let toDisplay = null
    if(props.data.getBooks){
        let toUse = props.data.getBooks.filter((book, index) => index <=3)
        toDisplay = toUse.map(book => {
            return(
                <LatestBook
                key={book._id}
                title={book.title}
                price={book.price}
                imageUrl={book.imageUrl}
                author={book.author.name}
                />
            )
        })
    }
    return(
        <div className="Latest">
            <div className="LatestBooks_Book_Text">
                <p className="LatestBooks_Book_Release">New Release</p>
                <p className="LatestBooks_Book_Quote">Get the lateast books on our library</p>
            </div>
            <div className="LatestBooks">
                {toDisplay}
            </div>
        </div>
    )
}
const query = gql`
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

export default graphql(query) (LatestBooks)