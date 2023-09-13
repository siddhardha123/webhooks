import express from 'express'
import cors from 'cors'
import axios from 'axios';
const app = express();
const port = 5001;

app.use(express.json())
app.use(cors())

const webHookStorage  = {
    COMMIT : [],
    PUSH : [],
    MERGE : [],
};


app.get("/",(req,res)=>{
     res.send("welcome")
})

app.post("/api/webhooks",(req,res)=>{
    try{
      const {payloadUrl,secret,eventTypes} = req.body;  
      eventTypes.forEach((event)=>{
         webHookStorage[event].push({payloadUrl,secret})
      })

      res.status(201).send("webhook is registered")

    }catch(error){
        res.send(error)
    }
      
})

app.post("/api/event-emulate",(req,res)=>{

       const {type,data} = req.body;
       //logic here
       
       //trigger an event
      setTimeout(()=>{
          const webhs = webHookStorage[type];
          webhs.forEach(async (web)=>{
             const {payloadUrl,secret} = web;
             await axios.post(payloadUrl,data,{
                 headers : {
                     'x-secret' : secret
                 }
              })
          })

      },0)

     res.status(201).send("webhook fired...");
})

app.get("/api/db",(req,res)=>{
    res.json(webHookStorage)
})


app.listen(port,()=>{
     console.log(`running app at ${port}.....`)
})




