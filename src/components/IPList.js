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
  TextArea
} from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  authenticate,
  attempLogin,
  fetchIpList,
} from "../store/actions/authActions";
class IPList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipList: [],
      isOpen: false,
      dataIndex: 0,
    };
    this.setOpenModal = this.setOpenModal.bind(this);
    this.openDataWithModal = this.openDataWithModal.bind(this);
    this.updateIP = this.updateIP.bind(this);
  }
  setOpenModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  openDataWithModal(event, index) {
    this.setState({ isOpen: !this.state.isOpen, dataIndex: index });
    event.preventDefault();
  }
  updateIP(){
      const {ipList,dataIndex} = this.state;
      let label = this.label;
      let description = this.description;
      let ipId = this.ipId;
        const ipData = {
            label: label,
            description:description,
            id: ipList[dataIndex].id
        }
        console.log("ipData",ipData);
    //   this.props.updateIpData(ipData).then((data) => {
    //     console.log("data iplist === ", data.data);
    //     this.setState({ ipList: data.data || [] });
    //   });

  }
  componentDidMount() {
    this.props.fetchIpList().then((data) => {
      console.log("data iplist === ", data.data);
      this.setState({ ipList: data.data || [] });
    });
  }

  render() {
    const { ipList, isOpen ,dataIndex} = this.state;
    return (
      <div className="wrapper">
        <h1>IP Address List</h1>

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

        <Modal
          onClose={() => this.setOpenModal()}
          onOpen={() => this.setOpenModal()}
          open={isOpen}
          trigger={<Button>Show Modal</Button>}
        >
          <Modal.Header>Update IP Label</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Form.Field inline>
                <Label pointing="right">Label</Label>
                <Input type="text" placeholder="label" 
                ref={node => (this.label = node)}
                value={ipList[dataIndex] ? ipList[dataIndex].label || "" :""}
                />
              </Form.Field>
              <Divider />
              <Form.Field inline>
                <Label pointing="right">Description</Label>
                <Input type="text" placeholder="Description" 
                ref={node => (this.description = node)}
                value={ipList[dataIndex] ? ipList[dataIndex].description || "" :""}
                />
              </Form.Field>
              <Divider />
              <Form.Field inline>
                <Label pointing="right">IP</Label>
                <Input type="text" disabled                 
                 value={ipList[dataIndex] ? ipList[dataIndex].ip || "" :""}
                />
              </Form.Field>
              <Divider />
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
              onClick={() => this.updateIP()}
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

IPList.propTypes = {
  //  fetchIpList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  //  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIpList: () => dispatch(fetchIpList()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IPList));
