const  gql = require('graphql-tag')

const querys = {
    getUserForCart: gql`
        {
            getUserForCart{
                _id
                cart{
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
    `
}

export default querys