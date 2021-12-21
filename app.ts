import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

// Routes
import  UserRouter from './src/Routes/User'
dotenv.config();


if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

 app.use(helmet());
 app.use(express.json());

 app.get('/', (req, res) => {
     res.send('get')
 })

app.use('/api/user', UserRouter)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});