import express, { NextFunction, Request, Response } from "express"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import chalk from "chalk";
import cors from "cors";

import { connectMongoDB } from "../db/connect/ConnectMongoDB";
import { errorHandler, notFoundHandler } from "../middleware/errorHandler";

const app = express()

connectMongoDB.connect()
app.use(cors(
    {
        origin: "*", // Allow all origins (change to specific domain in production)
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser());

// app.use(notFoundHandler);
// app.use(((err: any, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next)) as unknown as express.ErrorRequestHandler);

// process.on("unhandledRejection", (reason, promise) => {
//     console.error(chalk.red("Unhandled Rejection:", promise, "Reason:", reason));
// });

// // Handle uncaught exceptions
// process.on("uncaughtException", (error) => {
//     console.error(chalk.red("Uncaught Exception:", error));
//     process.exit(1);
// });

export default app