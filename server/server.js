const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');
const cors = require('cors')

app.use(cors()) // to allow cross origin connections
app.use(express.json()); // to be able to get json in the backend

const port = process.env.PORT || 3001

// DATABASE connection
let url = "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log(`BD Connected to ${url}`)
})
.catch(error => {
    console.log("ERROR:", error)
})

// ADD DATA
app.post('/addfriend', async (req, res) => {
    const name = req.body.name; // to access the bodydata on the axios post
    const age = req.body.age;

    const friend = new FriendModel({ name: name, age: age });
  try {
      await friend.save()
  } catch (error) {
      console.log(error)
  }
})

// READ DATA
app.get('/read', async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if(err){
            res.send(err)
        } else {
            res.send(result)
        }
    })
})


app.listen(port, () => {
    console.log("SERVER running on:", port)
})