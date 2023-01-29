import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class AddContacts extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone: "",
    };
  }

  functionChange = (inputType, e) => {
    if (inputType === "name") {
      this.setState({
        name: e.target.value,
      });
      return;
    }
    this.setState({
      phone: e.target.value,
    });
  };

  functionSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = this.state;
    const { addContact } = this.props;
    if (name && phone) {
      addContact(name, phone);
      this.setState({
        name: "",
        phone: "",
      });
    }
  };

  render() {
    const { name, phone } = this.state;
    return (
      <center>
        
      <Form id="one">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name"  value={name}
            required
            onChange={(e) => this.functionChange("name", e)} />
        <Form.Text className="text-muted">
          Name cannot be empty.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Phone Number</Form.Label>
        <Form.Control type="" placeholder="Phone Number"  value={phone}
            required
            onChange={(e) => this.functionChange("phone", e)} />
      </Form.Group>
     
      <Button style={{backgroundColor:'green'}}variant="primary" type="submit"  onClick={this.functionSubmit}>
        ADD CONTACT
      </Button>
    </Form>
            </center>
     
    );
  }
}

export default AddContacts;