const  gql = require('graphql-tag')

module.exports= {
    getUserForCart: gql`
        {
            getUserForCart{
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