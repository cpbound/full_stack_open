import { useState, useEffect } from "react";
import Search from "./components/Search";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");

  useEffect(() => {
    // console.log("effect");
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  // console.log("render", persons.length, "contacts");

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

  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(showAll.toLowerCase())
  )
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(showAll.toLowerCase())
      )
    : persons;

  const addPerson = (event) => {
    event.preventDefault();

    const searchedName = persons.find((person) => person.name === newName);

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.find((person) => person.name === newName)) {
      const popup = window.confirm(
        `${newName} has already been added to the phonebook! Do you want to update the number?`
      );

      if (!popup) {
        return;
      } else {
        console.log(personObject, searchedName);
        personService.update(searchedName.id, personObject).then((response) => {
          console.log(searchedName, personObject, response.data);
          setPersons(
            persons.map(
              (person) =>
                console.log(person, response.data) ||
                person.id !== searchedName.id
                  ? person
                  : response.data,
              setNewName(""),
              setNewNumber("")
            )
          );
        });
      }
    } else {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const popup = window.confirm(`Delete ${person.name}?`);
    if (!popup) {
      return;
    }
    personService.destroy(person.id).then((response) => {
      console.log(response);

      setPersons(persons.filter((person) => person.id !== id));
    });
  };

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
      <ContactList contacts={namesToShow} deletePerson={deletePerson} />
    </>
  );
};

export default App;
