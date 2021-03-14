import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search, { searchUsers } from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layout/Alert";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );

    this.setState({ users: response.data, loading: false });
  }

  //search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );

    this.setState({ users: response.data.items, loading: false });
  };

  //clear github users
  clearUsers = () => {
    this.setState({ users: [] });
    this.setState({ loading: false });
  };

  //setAlert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div test-comp="component-app" className="App">
        <Navbar test-comp="component-navbar" />
        <div className="container">
          <Alert test-comp="component-alert" alert={this.state.alert} />
          <Search
            test-comp="component-search"
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            clearButton={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users test-comp="component-users" loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
