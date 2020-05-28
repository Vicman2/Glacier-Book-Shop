import React from 'react'
import * as actionTypes from '../../../Store/actions'
import './Notification.css'
import { connect } from 'react-redux'

const Notification = (props) => {
    const classes = ["Notification"]
    if(props.show){
        classes.push("Show_Notification");
    }else{
        classes.push("Hide_Notification");
    }
    const classesContent = ["Notification_Content"];
    let iconName = null
   switch (props.status) {
       case "warning":
           classesContent.push("Notification_Warning")
           iconName = "alert"
           break;
        case "error":
            classesContent.push("Notification_Error")
            iconName = "alert"
            break;
        case "success":
            classesContent.push("Notification_Success")
            iconName = "checkmark-circle-outline"
            break;
       default:
           classesContent.push("Notification_Primary")
           iconName = "information-circle"
           break;
   }
    return(
        <div className={classes.join(" ")}>
            <div className={classesContent.join(" ")}>
                <p>{props.content}</p>
                <p><ion-icon name={iconName}></ion-icon></p>
                <button onClick={props.cancelNotification}>Ok</button>
            </div>
        </div>
    )
}
const actionsMappedToProps = dispatch => {
    return {
        cancelNotification: () => dispatch(actionTypes.cancelNotificaton())
    }
}

export default connect(null, actionsMappedToProps) (Notification)