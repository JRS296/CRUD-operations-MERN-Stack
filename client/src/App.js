import './App.css';
import React, {useState} from "react";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("")
  const [days, setDays] = useState(0)

  const addToList = () => {
    console.log(foodName+days)
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  return (
    <div className="App">
      <h1>CRUD App using MERN</h1>

      <label>Food Name:</label>
      <input type="text" onChange={(e) => {setFoodName(e.target.value)}}></input>
      <label>Days Elapsed:</label>
      <input type="number" onChange={(e) => {setDays(e.target.value)}}></input>
      <button onClick={addToList}>Add to List</button>
    </div>
  );
}

export default App;
