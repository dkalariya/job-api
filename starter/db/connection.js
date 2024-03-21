const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/jobsAPI",
{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is successfully")
}).catch((e)=>{
    console.log("connecting error")
    
})