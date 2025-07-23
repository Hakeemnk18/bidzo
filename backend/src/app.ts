import express from 'express'
import { connectdb } from './config/db'
import userRoutes from "./routes/user.routes";
import cors from "cors"
import 'dotenv/config';
connectdb()

const app = express()


app.use(cors())
app.use(express.json());
app.use("/user/", userRoutes);

app.listen(4004)

