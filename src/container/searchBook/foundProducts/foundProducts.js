import React from "react";
import { flowRight as compose } from "lodash";
import { connect } from "react-redux";
import * as actions from '../../../Store/actions'
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import './foundProducts.css'
import Aux from "../../../HOC/Aux";
import { withRouter } from "react-router-dom";

const FoundProducts = (props) => {
    const clickedChecked = (foundId) => {
        props.history.push(`/product/${foundId}`)
        props.showFoundBooks();
    }
  let classes = ["FoundProducts"];
  if (props.showFound) {
    classes.push("Show_FoundBooks");
  } else {
    classes.push("Hide_FoundBooks");
  }
  const toShow = props.founds.map((found) => {
    return <p className="BookFound" key={found._id} onClick={()=>clickedChecked(found._id)}> 
            {found.title}  </p>;
  });
  return (
    <Aux>
        <Backdrop toggled={props.showFound} clicked={props.showFoundBooks} />
        <div className={classes.join(" ")}>
        {toShow}
        </div>
    </Aux>
  );
};

const propsMappedToState = (state) => {
  return {
    showFound: state.showFoundProducts,
  };
};

const actionMappedToProps = (dispatch) => {
  return {
    showFoundBooks: () => dispatch(actions.showFoundProducts()),
    showNotification: (payload) => dispatch(actions.showNotification(payload))
  };
};

export default compose(
    withRouter,
    connect(propsMappedToState, actionMappedToProps)
)(FoundProducts);
