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
        app.delete('/api/delete-billing/:billId', async (req, res) => {
            const query = { id: req.params.billId }
            return res.send(await billCollection.deleteOne(query))
        })
        app.get('/api/all-bills-info', async (req, res) => {
            const billCount = await billCollection.estimatedDocumentCount()
            const paidArray = await billCollection.find({}).toArray()
            const paidCount = sumOfBill(paidArray)
            res.send({ billCount, paidCount })
        })
        app.get('/api/bills-max-ten', async (req, res) => {
            const currentPage = Number(req.query.currentpage) - 1
            if (req.query.fullname || req.query.phone || req.query.email) {
                if (req.query.fullname) {
                    return res.send(await billCollection.find({ fullname: req.query.fullname }).skip(currentPage * 10).limit(10).toArray())
                }
                else if (req.query.email) {
                    return res.send(await billCollection.find({ email: req.query.email }).skip(currentPage * 10).limit(10).toArray())
                }
                else {
                    return res.send(await billCollection.find({ phone: req.query.phone }).skip(currentPage * 10).limit(10).toArray())
                }
            }
            else {
                return res.send(await billCollection.find({}).skip(currentPage * 10).limit(10).toArray())
            }
        })
    }
    finally { }
}
run().catch(console.dir)

const sumOfBill = (arr) => {
    const amounts = arr.map(bill => bill.amount)
    const cost = amounts.reduce((acc, cur) => acc + cur, 0)
    return cost
}