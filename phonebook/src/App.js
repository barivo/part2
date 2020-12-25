import React, { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Filter from "./Filter";
import Notification from "./Notification";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState({ type: null, text: null });

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
            setMessage({
              type: "success",
              text: `Changed ${oldPerson.name}'s number`,
            });
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log(error);
            setMessage({
              type: "error",
              text: error.response.data.error,
            });
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personsService
        .add(newPerson)
        .then((repsonse) => {
          setPersons(persons.concat(repsonse));
          setMessage({
            type: "success",
            text: `Added ${newPerson.name}`,
          });
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          // console.log(JSON.stringify(error.response));
          if (error.response) {
            setMessage({
              type: "error",
              text: error.response.data.error,
            });
          } else if (error.request) {
            console.log("error.request", error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
  };
  const handleSearch = (event) => {
    let filter = event.target.value.toLowerCase();
    setNewFilter(filter);
  };
  const handleDelete = (id, person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setMessage({
            type: "warning",
            text: `Deleted ${person.name}.`,
          });
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setMessage({
            type: "error",
            text: `${person.name} no longer exists on server.`,
          });
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <Notification message={message} setMessage={setMessage} />
      <Filter
        handleSearch={handleSearch}
        message={message}
        setMessage={setMessage}
      />
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
