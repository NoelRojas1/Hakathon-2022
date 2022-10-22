import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function Symptoms() {
  const { id } = useParams();
  const [symptoms, setSymptoms] = useState([]);
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [painLevel, setPainLevel] = useState(1);

  const submitHandler = async (e) => {
    e.preventDefault();

    await Axios.post(`http://localhost:5000/users/${id}/add/symptom`, {
      name: name,
      painLevel: painLevel,
    });
    // await Axios.put(`http://localhost:5000/users/edit/${id}`, {
    //     name: name || user.name,
    //     email: email || user.email,
    //   });
  };

  useEffect(() => {
    const fetchSymptoms = async () => {
      const { data } = await Axios.get(
        `http://localhost:5000/users/symptoms/${id}`
      );
      console.log("Data", data);
      if (data) {
        setSymptoms(data.symptoms);
        setUser(data);
      }
    };
    fetchSymptoms();
  }, []);

  return (
    <div>
      <div>
        Patient: <strong>{user.name}</strong>
      </div>
      {symptoms.map((symptom) => (
        <section key={symptom._id} className="row">
          <p>
            <span>Symptom: </span> <strong>{symptom.name}</strong>
          </p>
          <p>
            <span>Pain level: </span> <strong>{symptom.painLevel}</strong>
          </p>
        </section>
      ))}

      <div>
        <Link to={`/report/${user._id}`}>Get Patient Report</Link>
      </div>

      <div>
        <form className="form" onSubmit={submitHandler}>
          <div>Add symptom</div>
          <div>
            <label htmlFor="name">Symptom Name</label>
            <input
              type="text"
              placeholder="symptom"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="painLevel">Select Pain level</label>
            <select
              name="painLevel"
              id="painLevel"
              onChange={(e) => setPainLevel(Number(e.target.value))}
            >
              <option value="1">pain is barely noticeable</option>
              <option value="5">
                pain is very distracting and may stop them from being able to do
                typical activities
              </option>
              <option value="10">
                pain is bad enough to prevent moving on your own
              </option>
            </select>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
