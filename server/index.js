const express = require('express')
const mongoose = require('mongoose')
const app = express()

const FoodModel = require("./models/Food");

app.use(express.json())

mongoose.connect("mongodb+srv://JRS296:pappa123@cluster0.gc5ji3s.mongodb.net/food?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
})

app.get('/', async (req,res) => {
    const food = new FoodModel({foodName: "Apple", daysSinceIAte: 3 });

    try {
        console.log('Connected to MongoDB!!!')
        await food.save();
    } catch (error) {
        console.log(error)
    }
})

app.listen(3001, ()=> {
    console.log('Server running on port 3001')
})