import { useEffect, useState } from 'react';
import { GlobalStyle } from './GlobalStyled';
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { SearchBar } from './SearchBar';

export const App = () => {
  // const contactsArr = [
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ];

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('newContact', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('newContact');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const addContact = newContact => {
    const { name, number } = newContact;

    if (!name || !number) {
      alert('Please fill in both name and number fields.');
      return;
    }
    const contactExists = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number
    );

    if (contactExists) {
      alert('Contact with this name or number already exists.');
      return;
    }
    const contactPerson = {
      ...newContact,
      id: nanoid(),
    };

    setContacts(prevContacts => [...prevContacts, contactPerson]);
  };

  const updateFilter = newValue => setFilter(newValue);

  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(item => item.id !== contactId)
    );
  };

  const visibleContact = contacts.filter(item => {
    const trueContact = item.name.toLowerCase().includes(filter.toLowerCase());
    return trueContact;
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <SearchBar value={filter} updateFilter={updateFilter} />
      {contacts.length > 0 && (
        <ContactList contacts={visibleContact} removeContact={removeContact} />
      )}
      <GlobalStyle />
    </div>
  );
};
