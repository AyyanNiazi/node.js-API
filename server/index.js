const express = require("express")
const app = express()

const PORT = 5000;

app.get('/api', (req, res) => {
    res.send("Gist Swap Api will be listed here on NODE server")
})

app.get('/api/user', (req, res) => {
    res.send("I'm dummy User from Node Server")
})

app.listen(process.env.PORT || PORT, () => {
    console.log('server is running on 5000')
})