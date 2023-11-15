import Contact from "./Contact";

const ContactList = ({ contacts }) => {
  return (
    <div>
      {contacts.map((person) => (
        <Contact key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default ContactList;
