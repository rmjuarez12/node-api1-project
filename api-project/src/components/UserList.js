// Import Modules
import { useEffect, useState } from "react";
import axios from "axios";

// Import Components
import User from "./User";

export default function UserList() {
  //* State for the users list
  const [users, setUsers] = useState([]);

  //* State for the error message
  const [errors, setErrors] = useState("");

  //* State for while the data is being gathered
  const [isFetching, setIsFetching] = useState(true);

  //* Action response
  const [actionResponse, setActionResponse] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  //* Get users
  const getUsers = () => {
    const APIURL = "http://localhost:5000/api/users";

    axios
      .get(APIURL)
      .then((res) => {
        setUsers(res.data);
        setIsFetching(false);
      })
      .catch((err) => {
        setErrors(err.response.statusText);
        setIsFetching(false);
      });
  };

  //* Delete a user
  const deleteUser = (id) => {
    const APIURL = `http://localhost:5000/api/users/${id}`;

    axios
      .delete(APIURL)
      .then((res) => {
        setActionResponse(res.data.message);
        getUsers();
      })
      .catch((err) => {
        setErrors(err.response.statusText);
      });
  };

  return (
    <div id='users-list'>
      <h3>Users</h3>

      {actionResponse !== "" && (
        <div className='response'>{actionResponse}</div>
      )}

      {isFetching ? (
        <div>Loading...</div>
      ) : users.length > 0 ? (
        <ul className='users'>
          {users.map((user) => {
            return <User key={user.id} user={user} deleteUser={deleteUser} />;
          })}
        </ul>
      ) : (
        <div>No Users Found</div>
      )}

      {errors !== "" && <div>{errors}</div>}
    </div>
  );
}
