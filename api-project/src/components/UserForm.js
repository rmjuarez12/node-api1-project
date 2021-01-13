// Import Modules
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function UserForm() {
  //* Get parameters/history from the route
  const routeParams = useParams();
  const history = useHistory();

  //* Set initial state
  const initialState = {
    name: "",
    bio: "",
  };

  //* State to manage the form data
  const [userData, setUserData] = useState(initialState);

  //* State for errors
  const [errors, setErrors] = useState("");

  //* State to check if form is editing or adding
  const [isEditing, setIsEditing] = useState(false);

  //* State for when form is fetchin data
  const [isFetching, setIsFetching] = useState(false);

  //* Check if user is editing
  useEffect(() => {
    if (routeParams.id !== undefined) {
      setIsEditing(true);
      setIsFetching(true);

      const APIURL = `http://localhost:5000/api/users/${routeParams.id}`;
      axios
        .get(APIURL)
        .then((res) => {
          setUserData(res.data);
          setIsFetching(false);
        })
        .catch((err) => {
          setErrors(err.message.statusText);
        });
    }
  }, [routeParams.id]);

  //* Manage field change
  const handleChange = (e) => {
    const newData = {
      ...userData,
      [e.target.name]: e.target.value,
    };

    setUserData(newData);
  };

  //* Manage Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //Check if user is editing or not
    if (isEditing) {
      const APIURL = `http://localhost:5000/api/users/${routeParams.id}`;

      axios
        .put(APIURL, userData)
        .then((res) => {
          console.log(res);
          history.push("/");
        })
        .catch((err) => {
          setErrors(err.message.statusText);
        });
    } else {
      const APIURL = `http://localhost:5000/api/users/`;

      axios
        .post(APIURL, userData)
        .then((res) => {
          console.log(res);
          history.push("/");
        })
        .catch((err) => {
          setErrors(err.message.statusText);
        });
    }
  };

  return (
    <div id='user-form'>
      <h3>{isEditing ? "Edit" : "Add"} User</h3>

      {isFetching ? (
        <div className='loading'>Loading Form</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>
            Name
            <input
              type='text'
              name='name'
              id='name'
              value={userData.name}
              onChange={handleChange}
            />
          </label>

          <label htmlFor='bio'>
            Biography
            <textarea
              type='text'
              name='bio'
              id='bio'
              value={userData.bio}
              onChange={handleChange}
            />
          </label>

          <button>{isEditing ? "Edit" : "Add New"} User</button>
        </form>
      )}

      {errors !== "" && <div className='errors'>{errors}</div>}
    </div>
  );
}
