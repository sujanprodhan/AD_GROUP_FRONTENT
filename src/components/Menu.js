import React, { Component } from "react";
import { Button, Menu } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";

class HeaderMenu extends Component {
  state = { activeItem: "home" };

  handleLogoutClick = () => {
    this.props.logOut();
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { loggedIn, user } = this.props.auth;
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
          as={Link}
          to="/"
        >
          Home
        </Menu.Item>
        <Menu.Item
          name="ip-list"
          active={activeItem === "ip-list"}
          onClick={this.handleItemClick}
          as={Link}
          to="/ip-list"
        >
          IP LIST
        </Menu.Item>
        <Menu.Item
          name="add-ip"
          active={activeItem === "add-ip"}
          onClick={this.handleItemClick}
          as={Link}
          to="/add-ip"
        >
          NEW IP LIST
        </Menu.Item>

        {!loggedIn && (
          <React.Fragment>
            <Menu.Menu position="right">
              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={this.handleItemClick}
                as={Link}
                to="/login"
              >
                Log-in
              </Menu.Item>
            </Menu.Menu>
          </React.Fragment>
        )}
        {loggedIn && (
          <Menu.Item
            position="right"
            name="logout"
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
          >
            <Button onClick={this.handleLogoutClick}>Logout</Button>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logOut })(withRouter(HeaderMenu));
