// import * as dotenv from "dotenv";
const express = require("express")
const  helmet = require("helmet");

// Routes
const UserRouter = require('./src/Routes/User')
// dotenv.config();


// if (!process.env.PORT) {
//     process.exit(1);
//  }
 
 const PORT = 5000;
 
 const app = express();

 app.use(helmet());
 app.use(express.json());

//  app.get('/', (req, res) => {
//      res.send('get')
//  })

app.use('/', UserRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});