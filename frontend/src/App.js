// import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./windows/Home";
import Register from "./windows/Register";
import Signin from "./windows/Signin";
import UserEdit from "./windows/UserEdit";
import UserList from "./windows/UserList";
import Symptoms from "./windows/Symptoms";
import Report from "./windows/Report";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="nav-link--logo" to="/">
              SGMC
            </Link>
          </div>
          <div>
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </div>

          <div>
            <Link to="/signin" className="nav-link">
              Sign In
            </Link>
          </div>

          <div>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/users" element={<UserList />}></Route>
            <Route exact path="/signin" element={<Signin />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/user/:id/edit" element={<UserEdit />}></Route>
            <Route
              exact
              path="/user/:id/symptoms"
              element={<Symptoms />}
            ></Route>
            <Route exact path="/report/:id" element={<Report />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
