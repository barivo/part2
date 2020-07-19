import React from "react";

const Persons = ({ persons, newFilter }) => {
  const people =
    newFilter.length > 0
      ? persons
          .filter((people) => people.name.toLowerCase().includes(newFilter))
          .map((people) => (
            <p key={people.name}>
              {" "}
              {people.name} {people.number}{" "}
            </p>
          ))
      : persons.map((people) => (
          <p key={people.name}>
            {" "}
            {people.name} {people.number}{" "}
          </p>
        ));

  return (
    <>
      <h3>Numbers</h3>
      {people}
    </>
  );
};

export default Persons;
