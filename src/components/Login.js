import React, { Component } from "react";
import { Grid, Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { authenticate } from "../store/actions/authActions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    account: {
      email: "test@test.mail",
      password: "test"
    }
  };

  handleSubmit = () => {
    const { email, password } = this.state.account;
    const { state } = this.props.location;
    const redirectUrl = state ? state.from.pathname : "/";
    this.props.authenticate(email, password, redirectUrl);
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({
      account
    });
  };

  render() {
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
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(null, { authenticate })(Login));
