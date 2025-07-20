import express from 'express'
import { connectdb } from './config/db'
import authRoutes from "./routes/auth.routes";
connectdb()
const app = express()
app.use(express.json());


app.use("/api/auth", authRoutes);

app.listen(4004)

