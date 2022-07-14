const express = require('express')
const mongoose = require('mongoose')
const app = express()

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const FoodModel = require("./models/Food");

app.use(express.json())

mongoose.connect("mongodb+srv://JRS296:pappa123@cluster0.gc5ji3s.mongodb.net/food?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
})

//POST Example
app.post('/insert', async (req,res) => {
    const fN = req.body.foodName
    const ds = req.body.days
    const food = new FoodModel({foodName: fN, daysSinceIAte: ds });

    try {
        console.log('Connected to MongoDB!!!')
        await food.save();
    } catch (error) {
        console.log(error);
        console.log()
    }
})

app.listen(3001, ()=> {
    console.log('Server running on port 3001')
})