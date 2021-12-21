const express = require("express")
const app = express()

const PORT = 5000;

app.get('/', (req, res) => {
    res.send("Hello worlds")
})

app.get('/user', (req, res) => {
    res.send("I'm dummy User")
})

app.listen(process.env.PORT || PORT, () => {
    console.log('server is running on 5000')
})