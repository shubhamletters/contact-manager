import React from "react";
import './App.css';
import ListItem from "./components/ListItem";
import AddContacts from "./components/AddContacts";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({
      users: data,
    });

    console.log("current state", this.state);
  }

  functionDelete = async (id) => {
    let { users } = this.state;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "DELETE",
    });

    let updatedUsers = users.filter((user) => user.id !== id);

    this.setState({
      users: updatedUsers,
    });
  };

  functionUpdate = async (name, phone, id) => {
    const { users } = this.state;
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id,
        phone,
        name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("Data from updation of contact", json));

    // let updatedUsers = [];

    let updatedUsers = users.map((user) => {
      if (user.id === id) {
        user.name = name;
        user.phone = phone;
      }
      return user;
    });

    this.setState({
      users: updatedUsers,
    });
  };

  functionAdd = async (name, phone) => {
    let id = Date.now(); //genarting a unique id using date
    const { users } = this.state;
    const url = "https://jsonplaceholder.typicode.com/users";
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name,
        phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("ADD CONTACT", json));

    let updatedUsers = [{ name, phone, id }].concat(users);

    this.setState({
      users: updatedUsers,
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <div id="two">
        <h1>CONTACT-MANAGER-APP</h1>
        </div>
        <AddContacts addContact={this.functionAdd} />
        <div id="contact-list-container">
        
          <ul>
            {users.length === 0 ? (
              <h1>Loading....</h1>
            ) : (
              users.map((user) => {
                return (
                  <ListItem
                    name={user.name}
                    contact={user.phone}
                    key={user.id}
                    id={user.id}
                    propsDelete={this.functionDelete}
                    handleUpdate={this.functionUpdate}
                  />
                );
              })
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;