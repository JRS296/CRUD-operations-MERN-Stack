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

const FoodModel = require("./models/Food"); //MongoDB model

app.use(express.json())

mongoose.connect("mongodb+srv://JRS296:pappa123@cluster0.gc5ji3s.mongodb.net/food?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
})

//POST Example
//insert - route
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
}); 

//GET Example
// /read - route
app.get('/read', async (req,res) => {//type http://localhost:3001/read to get data
    //FoodModel.find({ $where: {foodName: "Apple"}}, (err,result))
    FoodModel.find({}, (err,result) => {
        if(err)
        {
            console.log(err);
            res.send(err)
        }
        res.send(result)
    })
});

//Update Route
app.put('/update', async (req,res) => {
    const nfN = req.body.newName
    const id = req.body.id

    try {
        await FoodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = nfN;
            updatedFood.save();
            res.send("update");
        });
    } catch (err) {
        console.log(err);
    }
}); 

app.listen(3001, ()=> {
    console.log('Server running on port 3001')
})