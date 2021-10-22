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
import { addNewIPAPI } from "../store/actions/authActions";

class AddNewIP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      inputIP: "",
      inputLabel: "",
      inputDescription: "",
      updataErrorMessage: "",
      updateStatus: true,
      isProcessingData: true,
      ipErrorMessage: "",
      inputLabelError: "",
    };
    this.setOpenModal = this.setOpenModal.bind(this);
    this.openDataWithModal = this.openDataWithModal.bind(this);
    this.handleChangeIP = this.handleChangeIP.bind(this);
    this.handleChangeLabel = this.handleChangeLabel.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
  }
  setOpenModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  openDataWithModal(event, index) {
    let { ipList } = this.state;
    this.setState({
      isOpen: !this.state.isOpen,
      dataIndex: index,
      inputLabel: ipList[index] ? ipList[index].label : "",
      inputDescription: ipList[index] ? ipList[index].description : "",
    });
    event.preventDefault();
  }

  addNewIPAddress(event) {
    const { inputDescription, inputLabel, inputIP } = this.state;
    const ipData = {
      label: inputLabel,
      description: inputDescription,
      ip: inputIP,
    };

    let ipformat =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!inputIP.match(ipformat)) {
      this.setState({ ipErrorMessage: "Invalid IP address",ipSuccessMessage:"" });
    } else {
      this.setState({ ipErrorMessage: "" });
      let inputLabellength = inputLabel.length;
      if (!inputLabellength) {
        this.setState({ inputLabelError: "Please fill label",ipSuccessMessage:""  });
      } else {
        this.setState({ inputLabelError: "" });

        this.props.addNewIPAPI(ipData).then((data) => {
          if (data.status) {
            this.setState({
              updataErrorMessage: "",
              updateStatus: data.status,
              ipSuccessMessage: "Successfully added new IP",
              inputIP: "",
              inputLabel: "",
              inputDescription: "",
            });
          } else {
            this.setState({
              updataErrorMessage:
                "Something went wrong!. API update data  error!!",
              updateStatus: data.status,
              ipSuccessMessage: "",
            });
          }
        });
      }
    }
  }
  handleChangeIP(event) {
    this.setState({ inputIP: event.target.value });
  }
  handleChangeLabel(event) {
    this.setState({ inputLabel: event.target.value });
  }
  handleChangeDescription(event) {
    this.setState({ inputDescription: event.target.value });
  }

  render() {
    const {
      isOpen,
      inputIP,
      inputLabel,
      inputDescription,
      updateStatus,
      updataErrorMessage,
      ipErrorMessage,
      inputLabelError,
      ipSuccessMessage,
    } = this.state;
    return (
      <div className="wrapper">
        <h3>Add New IP Form</h3>

        <Modal
          onClose={() => this.setOpenModal()}
          onOpen={() => this.setOpenModal()}
          open={isOpen}
          trigger={<Button>+ Add New IP </Button>}
        >
          <Modal.Header>Add New IP</Modal.Header>
          {ipSuccessMessage && (
            <Message success>
              <Message.Header>{ipSuccessMessage}</Message.Header>
            </Message>
          )}

          <Modal.Content>
            {ipErrorMessage && (
              <Message warning>
                <Message.Header>{ipErrorMessage}</Message.Header>
              </Message>
            )}
            {inputLabelError && (
              <Message warning>
                <Message.Header>{inputLabelError}</Message.Header>
              </Message>
            )}
            <Modal.Description>
              <Form.Field inline>
                <Label pointing="right">IP * </Label>
                <Input
                  type="text"
                  placeholder="168.101.102.222"
                  value={inputIP}
                  onChange={this.handleChangeIP}
                />
              </Form.Field>
              <Divider />
              <Form.Field inline>
                <Label pointing="right">Label * </Label>
                <Input
                  type="text"
                  placeholder="label"
                  value={inputLabel}
                  onChange={this.handleChangeLabel}
                />
              </Form.Field>
              <Divider />
              <Form.Field inline>
                <Label pointing="right">Description</Label>
                <Input
                  type="text"
                  placeholder="Description"
                  value={inputDescription}
                  onChange={this.handleChangeDescription}
                />
              </Form.Field>

              {!updateStatus && updataErrorMessage && (
                <Message warning>
                  <Message.Header>{updataErrorMessage}</Message.Header>
                </Message>
              )}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={() => this.setOpenModal()}>
              Cancel
            </Button>
            <Button
              content="Add New Item"
              labelPosition="right"
              icon="plus"
              onClick={(e) => this.addNewIPAddress()}
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

AddNewIP.propTypes = {
  addNewIPAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // ipList: state.list.ipList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addNewIPAPI: (data) => dispatch(addNewIPAPI(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddNewIP)
);
