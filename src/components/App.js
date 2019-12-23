import React, { Component } from 'react';
import shortid from 'shortid';
import CreateContact from './CreateContact/CreateContact';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

const filterContactsByQuery = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  inputIds = {
    nameId: shortid.generate(),
    numberId: shortid.generate(),
    filterId: shortid.generate(),
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { name, number, contacts } = this.state;
    e.preventDefault();
    const createContact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (contacts.find(contact => contact.name === name)) {
      // eslint-disable-next-line no-alert
      alert('This name already exists');
    } else {
      this.setState(state => ({
        contacts: [...state.contacts, createContact],
      }));
    }
    this.resetForm();
  };

  handleDelete = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, contacts, number, filter } = this.state;
    const { nameId, numberId, filterId } = this.inputIds;
    const filtedContacts = filterContactsByQuery(contacts, filter);
    return (
      <>
        <h1>Phonebook</h1>
        <CreateContact
          name={name}
          nameId={nameId}
          number={number}
          numberId={numberId}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          onChange={this.handleChange}
          filterId={filterId}
        />
        <Contacts contacts={filtedContacts} onDelete={this.handleDelete} />
      </>
    );
  }
}

export default App;
