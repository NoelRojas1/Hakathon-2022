import React, { useEffect, useState } from "react";
import User from "../components/User";
import Axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const results = await Axios.get("http://localhost:5000/users");
      if (results) {
        setUsers(results.data);
      }
    }
    fetchUsers();
  }, []);

  console.log(users);
  return (
    <div>
      {users.map((user) => (
        <User key={user._id} name={user.name} id={user._id} />
      ))}
    </div>
  );
}
