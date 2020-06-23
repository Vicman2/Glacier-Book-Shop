import React, {Component} from 'react'
import querys from '../../Query_Mutation/query'
import Aux from '../../HOC/Aux'
import {flowRight as compose} from 'lodash'
import './Profile.css'
import { graphql } from 'react-apollo'
import Backdrop from '../../components/UI/Backdrop/Backdrop'



class Profile extends Component{
    render(){
        let classes = ["Profile"]
        if(this.props.show){
            classes.push("Show_Profile")
        }else{
            classes.push("Hide_Profile")
        }
        let userProfile = null
        if(this.props.data.getUser){
            userProfile = <Aux>
                <p className="User_Name"> {this.props.data.getUser.name} </p>
                <p className="User_Email"> {this.props.data.getUser.email} </p>
                <p className="User_Phone">{this.props.data.getUser.phone} </p>
            </Aux>
        }
        return(
            <Aux>
                <Backdrop toggled={this.props.show} />
                <div className={classes.join(" ")}>
                    <div className="Profile_Cancel">
                        <p onClick={this.props.cancel}> <ion-icon name="close"></ion-icon></p>
                    </div>
                    {userProfile}
                </div>
            </Aux>
        )
    }

}


export default compose(
    graphql(querys.getUser)
) (Profile)