import React from "react";

const Filter = ({ handleSearch }) => (
  <>
    <h2>Phonebook</h2>
    <div>
      filter shown with <input onChange={handleSearch} />
    </div>
  </>
);

export default Filter;
