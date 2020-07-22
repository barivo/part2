import React, { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  const handleNameChange = (event) => {
    let name = event.target.value;
    setNewName(name);
  };
  const handleNumberChange = (event) => {
    let number = event.target.value;
    setNewNumber(number);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const fixedNewName = newName.trim();
    const fixedNewNumber = newNumber.trim();

    const newPerson = { name: fixedNewName, number: fixedNewNumber };
    const oldPerson = persons.filter(
      (person) => person.name === fixedNewName
    )[0];
    if (oldPerson) {
      if (
        window.confirm(
          alert(
            `${fixedNewName} is already in the phonebook, replace the old number with a new one?`
          )
        )
      ) {
        personsService
          .update(oldPerson.id, { ...oldPerson, number: newNumber })
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPerson.id ? person : response
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      persons.some((people) => people.name === newName)
        ? alert(`${newName} is already added to phonebook`)
        : personsService.add(newPerson).then((repsonse) => {
            setPersons(persons.concat(repsonse));
            setNewName("");
            setNewNumber("");
          });
    }
  };
  const handleSearch = (event) => {
    let filter = event.target.value.toLowerCase();
    setNewFilter(filter);
  };
  const handleDelete = (id, person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(id);
      const updatedPersons = persons.filter((person) => person.id !== id);
      setPersons(updatedPersons);
    }
  };

  return (
    <div>
      <Filter handleSearch={handleSearch} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        handleSearch={handleSearch}
      />
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
