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
    `,
    changeBookQuantity: gql`
        mutation ChangeBookQuantity($bookId: ID!, $quantity: Int!){
            changeBookQuantity(bookId:$bookId, quantity: $quantity){
                _id
                cart{
                    _id
                    quantity
                    bookId{
                        _id
                        title
                        price
                        imageUrl
                        author{
                            name
                        }
                    }
                }
            }
        }
    `, 
    emptyCart: gql`
        mutation{
            emptyUserCart{
            _id
            }
        }
    `, 
    makeOrder: gql`
        mutation{
            makeOrder{
            _id
            }
        }
    `
}

export default mutation