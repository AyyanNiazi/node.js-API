const express = require("express")
const app = express()

const PORT = 5000;

app.get('/', (req, res) => {
    res.send("Hello worlds")
})

app.listen(process.env.PORT || PORT, () => {
    console.log('server is running on 5000')
})