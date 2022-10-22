import Axios from "axios";
import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const { data } = await Axios.post(
        "http://localhost:5000/users/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>Register</div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
