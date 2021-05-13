import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [friendList, setFriendList] = useState([])

  const addFriend = () => {
    axios.post("http://localhost:3001/addfriend", { // sending an Obj to the backend
      name: name,                                   // which matches the variables
      age: age,
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log("Error with axios POST:", err)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:3001/read")
    .then(response => {
      setFriendList(response.data)
    })
    .catch(err => {
      console.log("Error with axios GET:", err)
    })
  }, [])

  return (
    <div className="App">
      <div className="inputs">
        <input 
          type="text" 
          placeholder="Friend Name..."
          onChange={(event) => {
            setName(event.target.value)
          }}
          />
        <input 
          type="number" 
          placeholder="Friend Age..."
          onChange={(event) => {
            setAge(event.target.value)
          }}
          />

          <button onClick={addFriend}>Add Friend</button>
      </div>

      { friendList.map((val, index) => {
        return <div key={index}> {val.name} {val.age} </div>
      }) }
    </div>
  );
}

export default App;
