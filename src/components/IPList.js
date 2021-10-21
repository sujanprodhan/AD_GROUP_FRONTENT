import React, { Component } from "react";
import { Grid, Button, Form, Message, Table, Label } from "semantic-ui-react";
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
    };
  }

  componentDidMount() {
    this.props.fetchIpList().then((data) => {
      console.log("data iplist === ", data.data);
      this.setState({ ipList: data.data || [] });
    });
  }

  render() {
    const { ipList } = this.state;
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
                  <Table.Cell>{index + 1 }</Table.Cell>
                  <Table.Cell>{data.label}</Table.Cell>
                  <Table.Cell>{data.ip}</Table.Cell>
                  <Table.Cell>{data.description}</Table.Cell>
                  <Table.Cell><a href=""> Edit</a></Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

IPList.propTypes = {
  //   attempLogin: PropTypes.func.isRequired,
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
