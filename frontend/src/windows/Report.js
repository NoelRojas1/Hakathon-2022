import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Report() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await Axios.get(`http://localhost:5000/users/${id}`);
      console.log(data);
      if (data) {
        setSymptoms(data.symptoms);
        setUser(data);
      }
    };
    fetchUser();
  }, [id]);

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
        {symptoms.map((symptom) => (
          <li key={symptom._id}>
            Symptom: <span> {symptom.name}</span>
            Pain level: <span> {symptom.painLevel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
