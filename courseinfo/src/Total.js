import React from "react";

const Total = ({ parts }) => {
  const sum = parts
    .map(part => part.exercises)
    .reduce((acc, exer) => acc + exer);
  return (
    <p>
      <strong>Number of exercises {sum}</strong>
    </p>
  );
};

export default Total;
