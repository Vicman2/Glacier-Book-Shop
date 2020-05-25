import React, {Component} from 'react'
import gql from 'graphql-tag'
import './Preview.css'
import { graphql } from 'react-apollo'
import bookImage from '../Home/Assets/Cooking.jpeg'
import { connect } from 'react-redux'
import Button from '../../components/UI/Button/Button'
import { capitalizeFirstWord } from '../../Util/stringHelperFunctions'
import Aux from '../../HOC/Aux'
import LatestBooks from '../../components/LatestBooks/LatestBooks'

class Preview extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const book = {...this.props.data.getBook}
        let src = ""
        if(!this.props.data.loading){
            src = this.props.imageEndpoint + book.imageUrl
        }
        return(
            <Aux>
                <div className="Preview">
                    <div className="Preview_ImageContainer_Review"> 
                        <img src={src} alt="" />
                    </div>
                    <div className="Preview_Text_Details">
                        <p className="Preview_BookTitle"> {book.title ? capitalizeFirstWord(book.title) : ""} </p>
                        <p className="Preview_AuthorName"> {book.author? capitalizeFirstWord (book.author.name) : ""} (Author) </p>
                        <p className="Preview_Rating">
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                            <ion-icon name="star-outline"></ion-icon>
                        </p>
                        <p>${book.price} </p>
                        <div className="Preview_ButtonWrapper">
                            <Button name="Buy now" />
                            <Button name="Add To Cart" mode="dark" iconName="cart"/>
                        </div>
                        <p className="Preview_Description_Title">Description</p>
                        <p className="Preview_Desciption"> {book.description} </p>
                        <p className="Product_Detail_Title">Product Details</p>
                        <div className="Preview_Details">
                            <div className="Detail_Key">
                                <p>Paperback</p>
                                <p>Published </p>
                                <p>Title</p>
                                <p>ISBN</p>
                                <p>Language</p>
                            </div>
                            <div className="Detail_Value">
                                <p> {book.details? book.details.paperBack: ""} </p>
                                <p> {book.details? book.details.published: ""} </p>
                                <p> {book.details? capitalizeFirstWord(book.title): ""} </p>
                                <p> {book.details? book.details.ISBN: ""} </p>
                                <p> {book.details? book.details.language: ""} </p>
                            </div>
                        </div>
                        <div>
                            <p className="Preview_About_The_Author">About the Author</p>
                            <div className="Preview_Author_Details">
                                <div className="Preview_Author_Image_Container">
                                    <img src={bookImage} />
                                </div>
                                <div className="Preview_Author">
                                    <p>{book.author? book.author.website : ""} </p>
                                    <p>Member since December 2019</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <LatestBooks />
            </Aux>
        )
    }
}

const query = gql`
    query GetBook($id : ID!){
        getBook(id: $id ){
            _id
            title
            price
            description
            details{
              paperBack
              published
              ISBN
              language
            }
            imageUrl
            author {
              _id
              name
              website
              rating
            }
        }
    }
`
const stateMapedToProps = (state)=> {
    return {
        imageEndpoint: state.bookImageEndpoint
    }
}

export default connect(stateMapedToProps) (graphql(query, {
    options : (props) => ({ variables : { id: props.match.params.id}})
}) (Preview))