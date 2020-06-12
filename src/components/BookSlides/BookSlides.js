import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import './BookSlides.css'
import Aux from '../../HOC/Aux'
import BookSlide from './BookSlide/Bookslide'
import { withRouter } from 'react-router-dom'


const BookSides = (props) => {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
      const books = props.booksToSlide.map(book => (
        <BookSlide
        key={book._id}
        id={book._id}
        quote="Legends can only convey their knowledge through a book "
        name={book.title}
        imageUrl={book.imageUrl}
        />
      ))

    return (
        <Aux>
            <div className="BookSides">
            <section className="Lists">
                <Carousel responsive={responsive} autoPlay infinite>
                   {books}
                </Carousel>
            </section>
            </div>
        </Aux>
    )
}


export default withRouter (BookSides)