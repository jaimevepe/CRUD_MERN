import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("")
  const [friendList, setFriendList] = useState([]);

// SEND DATA To the BackEnd
  const addFriend = () => {
    axios.post("http://localhost:3001/addfriend", { // sending an Obj to the backend
      name: name,                                   // which matches the variables
      age: age,
      description: description
    }).then((response) => {
      console.log(response)
    })
    .then((res) => {
      setFriendList([...friendList, { _id: res.data._id, name: name, age: age, description: description }])
    })
    .catch(err => {
      console.log("Error with axios POST:", err)
    });
  }

  // UPDATE DATA
  const updateFriend = (id) => {
    const newName = prompt("Enter new name:")
    const newAge = prompt("Enter new age:")
    const newDescription = prompt("Enter new description")

    axios.put("http://localhost:3001/update", {
      newName: newName,
      newAge: newAge,
      newDescription: newDescription,
      id: id
    })
    .then(() => {
      setFriendList(friendList.map((val) => {
        return val._id === id ? { _id: id, name: newName, age: newAge, description: newDescription } : val
      }))
    })
    .catch(err => {
      console.log(err)
    })
  }

  // DELETE FRIEND
  const deleteFriend = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(() => {
      setFriendList(friendList.filter((val) => {
        return val._id !== id;
      }))
    })
  }

// GET DATA from the backend and display it 
// in the front end using useEffect
  useEffect(() => {
    axios.get("http://localhost:3001/read")
    .then(response => {
      setFriendList(response.data)
    })
    .catch(err => {
      console.log("Error with axios GET:", err)
    })
  },[])

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
          <input
            type="textarea"
            placeholder="Friend Description"
            onChange={((event) => {
              setDescription(event.target.value)
            })}
          />

          <button onClick={addFriend}>Add Friend</button>
      </div>

      <div className="friend_list">
        { friendList.map((val, index) => {
          return (
            <div key={index} className="friend_container">
                  <div className="friend"> 
                    <h3>Name: {val.name}</h3> 
                    <h3>Age: {val.age} </h3>
                    <h4>Description: {val.description}</h4>
                  </div>
                  <button onClick={() => {
                    updateFriend(val._id)
                  }} >Update</button>
                  <button id="removebtn" onClick={() => {
                    deleteFriend(val._id)
                  }}>X</button>
            </div>
                )
        }) }
      </div>
      
    </div>
  );
}

export default App;
