const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var cors = require('cors')
require('dotenv').config()
// middlewere
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.SECRET_KEY}:${process.env.SECRET_PASS}@cluster0.estdm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
 try{
    await client.connect();
    const collection = client.db("list-add").collection("dailytasks");
    app.post('/list', async(req, res)=>{
        const query = req.body;
        console.log(query);
        const result = await collection.insertOne(query);
        res.send(result);
    })
    app.get('/list', async(req, res)=>{
        const query = {};
        const result = collection.find(query);
        const services = await result.toArray();
        res.send(services);
    })
 }finally{

 }
}
run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})