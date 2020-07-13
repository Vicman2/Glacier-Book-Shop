import React, {Component} from 'react'
import BookShelve from './Assets/Book_Shelve.png'
import Register from './Assets/Create_Profile.png'
import Choose from './Assets/Choose_Books.png'
import Checkout from './Assets/Checkout_After_Delivery.png'
import CreateAndSell from './Assets/Create_And_Sell.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './About.css'
import Button from '../../components/UI/Button/Button'

class About extends Component{
    componentDidMount(){
        window.scrollTo(0,0)
    }
    render(){
        AOS.init()
        return(
            <div className="About">
                <div className="About_Shelve">
                    <p className="About_Text">Glacier is an online book shopping
                        website where you can buy books, from 
                        an category listed this includes: art, 
                        business, fantasy, cooking, sci-fi and lots
                        more you can aslo upload books for sale
                        on this website and earn while we sell
                        your books 
                    </p>
                    <div className="About_Shelve_Container">
                        <img src={BookShelve} alt="Shelve" />
                    </div>
                </div>
                <p className="About_howWeWork">How we work</p>
                <div className="About_What_We_Do">
                    <div className="About_Wedo" data-aos="zoom-in-up" >
                        <div className="About_Wedo_Img_cont">
                            <img src={Register} alt="Register" />
                        </div>

                        <p className="About_Wedo_title" >Register and Create a porfile</p>
                    </div>
                    <div className="About_Wedo" data-aos="zoom-in-up">
                        <div className="About_Wedo_Img_cont">
                            <img src={Choose} alt="Register" />
                        </div>
                        <p className="About_Wedo_title">Choose books to buy</p>
                    </div>
                    <div className="About_Wedo" data-aos="zoom-in-up">
                        <div className="About_Wedo_Img_cont">
                            <img src={Checkout} alt="Register" />
                        </div>
                        <p className="About_Wedo_title">Checkout and wait for delivery</p>
                    </div>
                </div>
                <div className="About_Last">
                    <div className="About_CreateSell_img_cont">
                        <img src={CreateAndSell} alt="" />
                    </div>
                    <div className="About_Last_actions">
                        <p>Create And Sell</p>
                        <Button mode="white" name="Publish a book" />
                    </div>
                </div>
            </div>
        )
    }
}

export default About