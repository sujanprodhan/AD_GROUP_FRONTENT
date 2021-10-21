import React, { Component } from "react";
import { Grid, Button, Form, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { authenticate, attempLogin } from "../store/actions/authActions";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      account: {
        email: "",
        password: "",
      },
      logError: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleSubmit = () => {
    const { email, password } = this.state.account;
    const { state } = this.props.location;
    const redirectUrl = state ? state.from.pathname : "/";
    const loginData = {
      email: email,
      password: password,
    };
    this.props.attempLogin(loginData, redirectUrl).then((data) => {
      if (data && data.token) {
        //this.setState({ logError: "" });       
      } else {
        console.log("data === ", data);
        this.setState({ logError: data.error });
      }
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({
      account,
    });
  };
  componentWillUnmount(){
    console.log("called here")
  }

  render() {
    const { logError } = this.state;
    const { loggedIn } = this.props;
    if (loggedIn) {
      //  {loggedIn ? <Redirect to="/ip-list" /> : ""} // redirect to other page
    }
    return (
      <div className="wrapper">
        <h1>Login</h1>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  label="Email"
                  name="email"
                  type="email"
                  value={this.state.account.email}
                  onChange={this.handleChange}
                />

                <Form.Input
                  label="Password"
                  type="password"
                  name="password"
                  value={this.state.account.password}
                  onChange={this.handleChange}
                />

                <Button type="submit" primary>
                  Login
                </Button>
              </Form>

              {logError && (
                <Message warning>
                  <Message.Header>{logError}</Message.Header>
                </Message>
              )}
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  attempLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    attempLogin: (data, redirectUrl) =>
      dispatch(attempLogin(data, redirectUrl)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
