import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';
import Contact from './Contact';

const Contacts = ({ contacts, onDelete }) => {
  return (
    <>
      <ul>
        {contacts.map(contact => (
          <li className={styles.item} key={contact.id}>
            <Contact onDelete={onDelete} contact={contact} />
          </li>
        ))}
      </ul>
    </>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contacts;
