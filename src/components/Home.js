import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { loggedIn, user } = this.props.auth;
    return (
      <div className="wrapper">
        <h1> AD GROUP Frontend Test</h1>

        {!loggedIn && (
          <div className="warning">
            IPList and Add new IP routes are protected. You need to login first
          </div>
        )}
        {loggedIn && (
          <p>
            Welcome <strong>{user.username}</strong>
          </p>
        )}
        <h4> Prepared By - MD. SUJAN MIAH</h4>
        <h4> Email- sujanitbd@gmail.com</h4>
        <h4>
          Git- Frontend ->
          <a href="https://github.com/sujanprodhan/AD_GROUP_FRONTENT">
            Click here to get code!
          </a>
        </h4>

        <h4>
          Git- Backend ->
          <a href="https://github.com/sujanprodhan/AD_GROUP_API">
            Click here to get code!
          </a>
        </h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Home);
