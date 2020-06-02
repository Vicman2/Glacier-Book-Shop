import gql from 'graphql-tag'

const mutation= {
    makeCart: gql`
        mutation MakeCart($books:[ID]!){
            makeCart(books: $books){
                cart{
                    _id
                }
            }
        }
    `,
    addToCart: gql`
        mutation AddToCart($bookId: ID!){
            addToCart(bookId: $bookId){
                _id
                cart{
                    _id
                }
            }
        }
    `,
    deleteBookFromCart: gql`
        mutation DeleteBookFromCart($bookId: ID!){
            deleteBookFromCart(bookId: $bookId){
                _id
                cart{
                    _id
                }
            }
        }
    `
}

export default mutation