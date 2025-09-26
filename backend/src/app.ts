import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import express from 'express'
import { connectdb } from './config/db'
import userRoutes from "./routes/user.routes";
import sellerRoutes from './routes/seller.routes'
import { Server } from 'socket.io';
import adminRoutes from './routes/admin.routes'
import { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { handleError } from './utils/customError';
import cors from "cors"

connectdb()

const app = express()
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  
  socket.on("join", (userId) => {
    socket.join(userId);
  });
});

app.use(cors())
app.use(express.json());
app.use("/user/", userRoutes);
app.use("/seller/",sellerRoutes)
app.use('/admin/',adminRoutes)



app.use((err:any, req: Request, res: Response, next: NextFunction) => {
  handleError(res, err);
});

httpServer.listen(process.env.PORT, () => {
  console.log('server started at ', process.env.PORT);
});



