const mongoose = require("mongoose");

mongoose.set('strictQuery', false);


mongoose.connect("mongodb+srv://namannitinrao:YLDFJH3kxBYTDu0L@cluster0.ehp8z.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connected!");
}).catch((err)=>{
    console.log(err);
})