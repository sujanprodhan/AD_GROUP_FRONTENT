import React, { Component } from "react";
import {
  Button,
  Form,
  Message,
  Label,
  Modal,
  Divider,
  Input,
  Icon,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { addNewUser } from "../store/actions/authActions";

class AddNewIP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: "test name",
      inputEmail: "test1@gmail.com",
      inputPassword: "123456",
      inputConfirmPassword: "123456",
      error: false,
      message: "",
      successMessage: "",
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword =
      this.handleChangeConfirmPassword.bind(this);
  }
  handleChangeName(event) {
    this.setState({ inputName: event.target.value });
  }
  handleChangeEmail(event) {
    this.setState({ inputEmail: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ inputPassword: event.target.value });
  }
  handleChangeConfirmPassword(event) {
    this.setState({ inputConfirmPassword: event.target.value });
  }
  addNewUser() {
    const { inputName, inputEmail, inputPassword, inputConfirmPassword } =
      this.state;
    if (
      inputName.length &&
      inputEmail.length &&
      inputPassword.length &&
      inputConfirmPassword.length
    ) {
      if (inputPassword.length < 6) {
        this.setState({
          error: true,
          message: " Please set password at least 6 char!",
          successMessage: "",
        });
      } else {
        if (inputPassword !== inputConfirmPassword) {
          this.setState({
            error: true,
            message: " Please set password same as confirm password",
            successMessage: "",
          });
        } else {


        const regex = /\S+@\S+\.\S+/;      
        if(regex.test(inputEmail)){
          const userData = {
            name: inputName,
            email: inputEmail,
            password: inputPassword,
            password_confirmation: inputConfirmPassword,
          };
          this.props.addNewUser(userData).then((data) => {
            if (data.message) {
              this.setState({
                error: false,
                message:"",
                successMessage: "Successfully created new user. Please login !",
                inputConfirmPassword: "",
                inputPassword: "",
                inputEmail: "",
                inputName: "",
              });
            } else {
              this.setState({
                error: true,
                successMessage: "",
                message:"Something went wrong!. API new user insertion error!!",
              });
            }
          });
        }
        else{
          this.setState({
            error: true,
            message: " Please provide valid email",
            successMessage: "",
          });
        }
        }
      }
      // &&
    } else {
      this.setState({
        error: true,
        message: " Please fill all of the filed!",
        successMessage: "",
      });
    }
  }

  render() {
    const {
      inputName,
      inputEmail,
      inputPassword,
      inputConfirmPassword,
      error,
      message,
      successMessage,
    } = this.state;
    return (
      <div className="wrapper">
        <h3>Add New User </h3>

        {error && (
          <Message warning>
            <Message.Header>{message}</Message.Header>
          </Message>
        )}

        {successMessage && (
          <Message success>
            <Message.Header>{successMessage}</Message.Header>
          </Message>
        )}

        <Form.Field inline>
          <Label pointing="right">Name * </Label>
          <Input
            type="text"
            placeholder="Name"
            value={inputName}
            onChange={this.handleChangeName}
          />
        </Form.Field>
        <Divider />
        <Form.Field inline>
          <Label pointing="right">Email * </Label>
          <Input
            type="email"
            placeholder="email"
            value={inputEmail}
            onChange={this.handleChangeEmail}
          />
        </Form.Field>
        <Divider />
        <Form.Field inline>
          <Label pointing="right">Password *</Label>
          <Input
            type="password"
            placeholder="password"
            value={inputPassword}
            onChange={this.handleChangePassword}
          />
        </Form.Field>

        <Form.Field inline>
          <Label pointing="right">Confirm Password *</Label>
          <Input
            type="password"
            placeholder="password"
            value={inputConfirmPassword}
            onChange={this.handleChangeConfirmPassword}
          />
        </Form.Field>

        <Divider />
        <Button
          content="Add New User"
          labelPosition="right"
          icon="plus"
          onClick={(e) => this.addNewUser()}
          positive
          type="submit"
        />
      </div>
    );
  }
}

AddNewIP.propTypes = {
  // addNewIPAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // ipList: state.list.ipList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (data) => dispatch(addNewUser(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddNewIP)
);
