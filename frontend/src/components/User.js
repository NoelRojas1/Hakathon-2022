import React from "react";
import { Link } from "react-router-dom";

export default function User(props) {
  return (
    <div className="row">
      <h3>Patient name: {props.name}</h3>
      <div>
        <Link to={`/user/${props.id}/edit`}>Edit</Link>
      </div>

      <div>
        <Link to={`/user/${props.id}/symptoms`}>Add Symptoms</Link>
      </div>
    </div>
  );
}
