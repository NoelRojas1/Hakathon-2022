import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserEdit(props) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await Axios.get(`http://localhost:5000/users/${id}`);
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
    console.log(user);
  }, [id, user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await Axios.put(`http://localhost:5000/users/edit/${id}`, {
      name: name || user.name,
      email: email || user.email,
    });
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>Edit</div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder={user.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
