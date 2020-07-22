import React from "react";

const Persons = ({ persons, newFilter, handleDelete }) => {
  const showPerson = (person) => (
    <span key={person.name}>
      {" "}
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person.id, person)}>delete</button>
      <br />
    </span>
  );
  let people =
    newFilter.length > 0
      ? persons
          .filter((person) => person.name.toLowerCase().includes(newFilter))
          .map((person) => showPerson(person))
      : persons.map((person) => showPerson(person));

  return (
    <>
      <h2>Numbers</h2>
      {people}
    </>
  );
};

export default Persons;
