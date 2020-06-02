const gql = require('graphql-tag')

module.exports= {
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
    `
}