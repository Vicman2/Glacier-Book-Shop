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
    `
}

export default querys