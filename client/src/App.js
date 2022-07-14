import './App.css';
import React, {useState, useEffect} from "react";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("")
  const [days, setDays] = useState(0)
  const [newName, setNewName] = useState("")
  const [foodList, setFoodList] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      //console.log(response)
      setFoodList(response.data)
    })
  }, [])

  const addToList = () => {
    //console.log(foodName+days)
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newName: newName, 
    });
  }

  return (
    <div className="App">
      <h1>CRUD App using MERN</h1>

      <label>Food Name:</label>
      <input type="text" onChange={(e) => {setFoodName(e.target.value)}}></input>
      <label>Days Elapsed:</label>
      <input type="number" onChange={(e) => {setDays(e.target.value)}}></input>
      <button onClick={addToList}>Add to List</button>

      <h1>Data: Food List</h1>
      {foodList.map((val,key) => {
        return(
          <div key={key} className="bdr">
            <span><h5> {val.foodName} </h5><h5> {val.daysSinceIAte} </h5></span> {" "}
            <input type="text" placeholder="Enter Change in name:" onChange={(e) => {setNewName(e.target.value)}}></input>
            <button onClick={() => updateFood(val._id)}>Update</button>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
