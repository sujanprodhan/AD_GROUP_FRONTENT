import React, { Component } from "react";
import {
  Grid,
  Button,
  Form,
  Message,
  Table,
  Label,
  Header,
  Image,
  Modal,
  Divider,
  Input,
  TextArea,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  authenticate,
  attempLogin,
  fetchIpList,
  updateIpData,
} from "../store/actions/authActions";
class IPList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipList: [],
      isOpen: false,
      dataIndex: 0,
      inputLabel: "",
      inputDescription: "",
      updataErrorMessage: "",
      updateStatus: true,
      isProcessingData: true,
    };
    this.setOpenModal = this.setOpenModal.bind(this);
    this.openDataWithModal = this.openDataWithModal.bind(this);
    this.updateIP = this.updateIP.bind(this);
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
  updateIP(event) {
    const { ipList, dataIndex, inputDescription, inputLabel } = this.state;
    const ipData = {
      label: inputLabel,
      description: inputDescription,
      id: ipList[dataIndex].id,
    };
    this.props.updateIpData(ipData).then((data) => {
      if (data.status) {
        ipList[dataIndex].label = inputLabel;
        ipList[dataIndex].description = inputDescription;
        this.setState({
          ipList: [...ipList],
          isOpen: false,
          updataErrorMessage: "",
          updateStatus: data.status,
        });
      } else {
        this.setState({
          updataErrorMessage: "Something went wrong!. API update data  error!!",
          updateStatus: data.status,
        });
      }
    });
  }

  handleChangeLabel(event) {
    this.setState({ inputLabel: event.target.value });
  }
  handleChangeDescription(event) {
    this.setState({ inputDescription: event.target.value });
  }
  componentDidMount() {
    this.props.fetchIpList().then((data) => {
      this.setState({ ipList: data.data || [], isProcessingData: false });
    });
  }

  render() {
    const {
      ipList,
      isOpen,
      dataIndex,
      inputLabel,
      inputDescription,
      updateStatus,
      updataErrorMessage,
      isProcessingData,
    } = this.state;
    return (
      <div className="wrapper">
        <h3>IP Address List</h3>

        {isProcessingData ? (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Just one second</Message.Header>
              We are fetching that content for you.
            </Message.Content>
          </Message>
        ) : (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>SL No.</Table.HeaderCell>
                <Table.HeaderCell>Label</Table.HeaderCell>
                <Table.HeaderCell>IP Address</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {ipList &&
                ipList.map((data, index) => (
                  <Table.Row key={data.label + index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{data.label}</Table.Cell>
                    <Table.Cell>{data.ip}</Table.Cell>
                    <Table.Cell>{data.description}</Table.Cell>
                    <Table.Cell>
                      <a
                        href=""
                        onClick={(e) => this.openDataWithModal(e, index)}
                      >
                        {" "}
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        )}
        <Modal
          onClose={() => this.setOpenModal()}
          onOpen={() => this.setOpenModal()}
          open={isOpen}
          //trigger={<Button>Show Modal</Button>}
        >
          <Modal.Header>Update IP Label</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Form.Field inline>
                <Label pointing="right">IP</Label>
                <Input
                  type="text"
                  disabled
                  value={ipList[dataIndex] ? ipList[dataIndex].ip || "" : ""}
                />
              </Form.Field>
              <Divider />
              <Form.Field inline>
                <Label pointing="right">Label</Label>
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
              content="Update"
              labelPosition="right"
              icon="checkmark"
              onClick={(e) => this.updateIP()}
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

IPList.propTypes = {
  fetchIpList: PropTypes.func.isRequired,
  updateIpData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ipList: state.list.ipList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateIpData: (data) => dispatch(updateIpData(data)),
    fetchIpList: () => dispatch(fetchIpList()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IPList));
