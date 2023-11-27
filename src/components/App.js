import { Component } from 'react';
import { GlobalStyle } from './GlobalStyled';
import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { SearchBar } from './SearchBar';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('newContact', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem('newContact');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  addContact = newContact => {
    const { name, number } = newContact;

    if (!name || !number) {
      alert('Please fill in both name and number fields.');
      return;
    }
    const contactExists = this.state.contacts.some(
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

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contactPerson],
      };
    });
  };

  updateFilter = newValue => {
    this.setState(() => {
      return {
        filter: newValue,
      };
    });
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(item => item.id !== contactId),
      };
    });
  };

  render() {
    const visibleContact = this.state.contacts.filter(item => {
      const trueContact = item.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
      return trueContact;
    });
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <SearchBar
          filters={this.state.filter}
          updateFilter={this.updateFilter}
        />
        {this.state.contacts.length > 0 && (
          <ContactList
            contacts={visibleContact}
            removeContact={this.removeContact}
          />
        )}
        <GlobalStyle />
      </div>
    );
  }
}
