import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import { connectdb } from './config/db'
import userRoutes from "./routes/user.routes";
import sellerRoutes from './routes/seller.routes'
import cors from "cors"

connectdb()

const app = express()


app.use(cors())
app.use(express.json());
app.use("/user/", userRoutes);
app.use("/seller/",sellerRoutes)

app.listen(4004)

