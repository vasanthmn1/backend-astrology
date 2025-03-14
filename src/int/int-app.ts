import express, { NextFunction, Request, Response } from "express"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import chalk from "chalk";
import cors from "cors";

import { connectMongoDB } from "../db/connect/ConnectMongoDB";

const app = express()

connectMongoDB.connect()
app.use(cors(
    {
        origin: "*", // Allow all origins (change to specific domain in production)
        // methods: ["GET", "POST", "PUT", "DELETE"],
        // allowedHeaders: ["Content-Type", "Authorization"],
    }
))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser());

// app.use(notFoundHandler);
// app.use(((err: any, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next)) as unknown as express.ErrorRequestHandler);

export default app