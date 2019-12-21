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
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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
