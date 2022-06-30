const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const uri = `mongodb+srv://${process.env.DB_OWNER}:${process.env.DB_PASSWORD}@cluster0.wcxgg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async () => {
    try {
        await client.connect();
        const billCollection = client.db('Power-Grid').collection('bills')
        app.post('/api/add-billing', async (req, res) => {
            return res.send(await billCollection.insertOne(req.body))
        })
        app.get('/api/billing-list', async (req, res) => {
            return res.send(await billCollection.find({}).toArray())
        })
        app.put('/api/add-billing/:billId', async (req, res) => {
            const filter = { id: req.params.billId }
            const updateDoc = {
                $set: req.body
            };
            return res.send(await billCollection.updateOne(filter, updateDoc))
        })
    }
    finally { }
}
run().catch(console.dir)