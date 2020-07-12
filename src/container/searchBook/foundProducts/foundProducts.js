import React from "react";
import { flowRight as compose } from "lodash";
import { connect } from "react-redux";

const FoundProducts = (props) => {
  let classes = ["FoundProducts"];
  if (props.showFound) {
    classes.push("Show_FoundBooks");
  } else {
    classes.push("Hide_FoundBooks");
  }
  const toShow = props.founds.map((found) => {
    return <p className="BookFound"> {found.title} </p>;
  });
  return (
    <div className="FoundProducts">
      <Backdrop toggled={props.showFound} clicked={props.showFoundBooks} />
      {toShow}
    </div>
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

export default compose(connect(propsMappedToState, actionMappedToProps))(
  FoundProducts
);
