import React, { useEffect, useState } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';

const App = () => {
  const [contactsState, setContactsState] = useState({
    contacts: [],
    filter: '',
  });

  const handleAddContact = values => {
    const { name, number } = values;

    const existingContact = contactsState.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`Contact with the name "${name}" already exists!`);
    } else {
      const newContact = {
        name,
        number,
        id: nanoid(),
      };
      setContactsState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  const handleFilterChange = filterValue => {
    setContactsState({ filter: filterValue });
  };
  const handleDeleteContact = contactId => {
    setContactsState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }
  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // const parsedContacts = JSON.parse(contacts) ??[];

    if (parsedContacts) {
      setContactsState({ contacts: parsedContacts });
    }
  }, []);
  // componentDidUpdate(prevState) {
  //   const nextContacts = this.state.contacts;
  //   const prevContacts = prevState.contacts;

  //   if (nextContacts !== prevContacts) {
  //     localStorage.setItem('contacts', JSON.stringify(nextContacts));
  //   }
  // }
  useEffect(() => {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }, [contactsState]);

  const { contacts, filter } = contactsState;
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.wrapper}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
};

export default App;
