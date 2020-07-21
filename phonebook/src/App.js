import React, { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
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
    persons.some((people) => people.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };
  const handleSearch = (event) => {
    let filter = event.target.value.toLowerCase();
    setNewFilter(filter);
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
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;
