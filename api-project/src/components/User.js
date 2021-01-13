import React from "react";
import { Link } from "react-router-dom";

export default function User(props) {
  //* Get the user object
  const { user, deleteUser } = props;

  return (
    <li>
      <div className='user-header'>
        <span className='name'>{user.name}</span>
        <button onClick={() => deleteUser(user.id)}>Delete</button>
        <Link to={`/edit-user/${user.id}`}>Edit</Link>
      </div>
      <p>{user.bio}</p>
    </li>
  );
}
