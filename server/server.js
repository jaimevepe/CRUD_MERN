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
    const description = req.body.description;

    const friend = new FriendModel({ name: name, age: age, description: description });
    try {
        await friend.save()
    } catch (error) {
        console.log(error)
    }
})

// GET DATA
app.get('/read', async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if(err){
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

// UPDATE DATA
app.put('/update', async (req, res) => {
    const newAge = req.body.newAge;
    const newName = req.body.newName;
    const newDescription = req.body.newDescription
    const id = req.body.id

    try {
        await FriendModel.findById(id, (error, friendToUpdate) => {
            friendToUpdate.age = Number(newAge)
            friendToUpdate.name = String(newName)
            friendToUpdate.description = String(newDescription)
            friendToUpdate.save()
        })
    } catch (error) {
        console.log(error)
    }
    res.send("Updated")
})

// DELETE DATA
app.delete('/delete/:id', async ( req, res) => {
    const id = req.params.id
    try {
        await FriendModel.findByIdAndRemove(id)
        res.send("Item Deleted")
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log("SERVER running on:", port)
})