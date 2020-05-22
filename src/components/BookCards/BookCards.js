import React from 'react'
import './BookCards.css'
import BookCard from './BookCard/BookCard'


const BookCards = (props) => {
    const toDisplay = props.books.map(book => (
        <BookCard
        key={book._id}
        imageUrl={book.imageUrl}
        title={book.title}
        price={book.price}
        />
    ))
    return(
        <div className="BookCards">
            {toDisplay}
        </div>
    )
}

export default BookCards