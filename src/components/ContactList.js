export const ContactList = ({ contacts, removeContact }) => {
  return (
    <div>
      <ul>
        {contacts.map(item => {
          return (
            <li key={item.id}>
              <b>
                {item.name}: {item.number}
              </b>
              <button type="button" onClick={() => removeContact(item.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
