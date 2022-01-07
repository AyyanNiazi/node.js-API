const express = require("express")
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET" )
        return res.status(200).json({})
    }
    next()
})

// Routes
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const collectionRoutes = require('./api/routes/collections')

const PORT = 5000;
const BASE_API = '/api/v1'

mongoose.connect(`mongodb+srv://shalli:${process.env.MONGODB_DB_ATLAS_PW}@cluster0.xisoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

app.use(`${BASE_API}/products`, productRoutes)
app.use(`${BASE_API}/orders`, orderRoutes)
app.use(`${BASE_API}/collections`, collectionRoutes)

app.listen(process.env.PORT || PORT, () => {
    console.log('server is running on 5000')
})