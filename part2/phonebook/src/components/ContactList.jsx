import Contact from "./Contact";

const ContactList = ({ contacts, deletePerson }) => {
  return (
    <div>
      {contacts.map((person) => (
        <div key={person.id}>
          <Contact key={person.id} name={person.name} number={person.number} />
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
