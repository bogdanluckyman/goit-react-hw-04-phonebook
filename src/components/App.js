import { useEffect, useState } from 'react';
import { GlobalStyle } from './GlobalStyled';
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { SearchBar } from './SearchBar';

const initialContacts = () => {
  const savedContacts = localStorage.getItem('newContact');
  return savedContacts !== null ? JSON.parse(savedContacts) : [];
};

export const App = () => {
  const [contacts, setContacts] = useState(initialContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('newContact', JSON.stringify(contacts));
  }, [contacts]);

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
