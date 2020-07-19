import React from "react";

const PersonForm = (props) => {
  const {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
    handleSubmit
  } = props;
  return (
    <>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />{" "}
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          {" "}
          <button onClick={handleSubmit} type="submit">
            {" "}
            add{" "}
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
