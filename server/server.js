const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends')

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
app.get('/insert', async (req, res) => {
    const friend = new FriendModel({ name: "Jaime", age: 28, description: "Tall and handsome" });
    await friend.save()
    res.send("Inserted Data")
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