const  gql = require('graphql-tag')

const querys = {
    getUserForCart: gql`
        {
            getUserForCart{
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
                            _id
                            name
                        }
                    }
                }
            }
        }
    `, 
    getUser: gql`
        {
            getUser{
                _id
                name
                email
                phone
            }
        }
    `,
    getOrders: gql`
        {
            getOrders{
                _id
                user
                totalPrice
                createdAt
                orders{
                    _id
                    quantity
                    book{
                        _id
                    }
                }
            }
        }
    `,
    getOrder: gql`
        query GetOrder($orderId : ID!){
            getOrder(orderId: $orderId){
                _id
                totalPrice
                orders{
                    _id
                    quantity
                    book{
                        _id
                        title
                        price
                    }
                }
            }
        }
    `, 
    searchBook: gql`
        query SearchBook($bookName: String!){
            searchBook(bookName: $bookName){
                title
            }    
        }
    `
}

export default querys