import express from 'express'
import cors from 'cors'
const app = express()

const port = 5002;

app.use(express.json())
app.use(cors())
const messages = [];


app.post("/getinfo",(req,res)=>{

    const data = req.body;
    messages.push(data)
    res.send("got the data")
})

app.get("/",(req,res)=>{
    res.json(messages)
})


app.listen(port,()=>{
    console.log(`running on port ${port}....`)
})