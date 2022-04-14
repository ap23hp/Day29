import React from 'react';
import axios from 'axios';

class CrudComponent extends React.Component {
  
  constructor() {
    super();
    this.state = {
      user: [],
      id: '',
      name: '',
      age: '',
      email: '',
    };
  }

  async componentDidMount() {
    var response = await axios.get(
     
     'https://62136dcef43692c9c6044f2d.mockapi.io/userss'
    );
    await this.setState({ user: response.data });
  }

  handleReset = () => {
    this.setState({
      name: '',
      age: '',
      email: '',
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.id) {
      // Update
      this.handleUpdate();
    } else {
      // Create
      this.handleCreate();
    }
  };

  handleUpdate = async () => {
    var response = await axios.put(
      `https://62136dcef43692c9c6044f2d.mockapi.io/userss/${this.state.id}`,
      {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email,
      }
    );
    var index = this.state.user.findIndex(
      (user) => user.id === response.data.id
    );
    var user = [...this.state.user];
    user[index] = response.data;
    this.setState({ user, name: '', age: '', email: '', id: '' });
    // console.log(this.state.user);
  };

  handleCreate = async () => {
    var response = await axios.post(
      'https://62136dcef43692c9c6044f2d.mockapi.io/userss',
      {
        name: this.state.name,
        age: this.state.age,
        email: this.state.email,
      }
    );
    var user = [...this.state.user];
    user.push(response.data);
    this.setState({ user, name: '', age: '', email: '' });
  };

  onPopulateData = (id) => {
    var selectedData = this.state.user.filter((user) => user.id === id)[0];
    this.setState({
      id: selectedData.id,
      name: selectedData.name,
      age: selectedData.age,
      email: selectedData.email,
    });
  };

  handleDelete = async (id) => {
    await axios.delete(
      `https://62136dcef43692c9c6044f2d.mockapi.io/userss/${id}`
    );
    var user = this.state.user.filter((user) => user.id !== id);
    this.setState({ user });

    // 1. axios.get and update in state variable
    // 2. remove the deleted obj from array in the state variable
  };

  render() {
    return (
      <>
     
        <h3> User Form </h3>
        <form className="form" onSubmit={this.handleSubmit}>
          <div>
            <label> Name </label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <br />
          <div>
            <label> Age </label>
            <input
              type="number"
              name="age"
              value={this.state.age}
              onChange={(e) => this.setState({ age: e.target.value })}
            />
          </div>
          <br />
          <div>
            <label> Email </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <br />
          <button  className="sub" type="submit">Submit </button> &nbsp; &nbsp;
          <button className="res" type="button" onClick={this.handleReset}>
            {' '}
            Reset{' '}
          </button>
        </form>
        <h3> User Data </h3>
        <section>
        <table border={1}>
          <thead>
            <tr>
              <td> Id </td>
              <td> Name </td>
              <td> Age </td>
              <td> Email </td>
              <td> Actions </td>
            </tr>
          </thead>
          <tbody>
            {this.state.user.map((data) => (
              <tr key={data.id}>
                <td> {data.id} </td>
                <td> {data.name} </td>
                <td> {data.age} </td>
                <td> {data.email} </td>
                <td>
                  <button  className="upd" onClick={() => this.onPopulateData(data.id)}>
                    {' '}
                    Update{' '}
                  </button>{' '}
                  &nbsp;
                  <button className="del" onClick={() => this.handleDelete(data.id)}>
                    {' '}
                    Delete{' '}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>
      </>
    );
  }
}

export default CrudComponent;