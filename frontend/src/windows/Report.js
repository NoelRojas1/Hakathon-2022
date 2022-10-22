import Axios from "axios";
import React, { useEffect, useState } from "react";

export default function Report() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await Axios.get(
        `http://localhost:5000/user/${user._id}`
      );
      console.log(data);
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      <div>Report</div>
      <div>
        <p>
          <span>
            Patient's name: <strong>{user.name}</strong>
          </span>
        </p>
        <p>
          <span>
            Patient's age: <strong>{user.age}</strong>
          </span>
        </p>
        <p>
          <span>
            Patient's email: <strong>{user.email}</strong>
          </span>
        </p>
      </div>
      <ul>
        {user ??
          user.symptoms.map((symptom) => (
            <li key={symptom._id}>
              Symptom: <span> {symptom.name}</span>
              Pain level: <span> {symptom.painLevel}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
