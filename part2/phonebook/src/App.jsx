import { useState } from "react";
import Search from "./components/Search";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState();
  const [newNumber, setNewNumber] = useState();
  const [showAll, setShowAll] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setShowAll(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} has already been added to the phonebook!`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(showAll.toLowerCase())
  )
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(showAll.toLowerCase())
      )
    : persons;

  return (
    <>
      <h2>Phonebook</h2>
      <Search filter={handleFilterChange} />
      <h2>Add Contact</h2>
      <AddContact
        name={newName}
        number={newNumber}
        addPerson={addPerson}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ContactList contacts={namesToShow} />
    </>
  );
};

export default App;
