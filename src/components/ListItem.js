import React from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      editedName: "",
      editedPhone: "",
    };
  }

  handleEdit = () => {
    this.setState({
      editMode: true,
    });
  };

  handleNameChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      editedName: e.target.value,
    });
  };

  handlePhoneChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      editedPhone: e.target.value,
    });
  };

  functionUpdate = async () => {
    const { editedName, editedPhone } = this.state;
    const { handleUpdate, id } = this.props;
    if (editedName && editedPhone) {
      await handleUpdate(editedName, editedPhone, id);
      this.setState({
        editMode: false,
      });
    }
  };

  render() {
    const { name, contact, propsDelete, id } = this.props;
    const { editMode } = this.state;
    return (
      <>
      <Card id="card" style={{ width: '18rem',top:'30px',left:'30px',backgroundColor:'rgb(70,196,221)' }}>
      <Card.Body>
        <Card.Title>
        {editMode ? (
             <input
               placeholder="Name..."
               onChange={this.handleNameChange}
               required
             />
           ) : (
             name
           )}
        </Card.Title>
        <Card.Text>
        {editMode ? (
             <input
               placeholder="Phone..."
               onChange={this.handlePhoneChange}
               required
             />
          ) : (
            contact
           )}
        </Card.Text>
        {editMode ? (
          <Button variant="primary"  onClick={this.functionUpdate}>submit</Button>
        ):(
          <Button style={{backgroundColor:'rgb(226,228,103)',color:'black'}}  className="btn1" variant="primary"  onClick={this.handleEdit}>EDIT</Button>
        )}
       
         <Button style={{backgroundColor:'rgb(223,109,109)'}} className="btn2" variant="primary"  onClick={()=>propsDelete(id)}>DELETE</Button>
      </Card.Body>
    </Card>
      </>
     
    );
  }
}

export default ListItem;