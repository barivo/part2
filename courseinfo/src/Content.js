import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  let allParts = parts.map(part => <Part key={part.id} part={part} />);
  return <div>{allParts}</div>;
};

export default Content;
