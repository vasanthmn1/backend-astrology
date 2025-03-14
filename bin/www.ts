import express, { NextFunction, Request, Response } from "express";
import app from "../index";
import _config from "../src/config/config";
import { errorHandler, notFoundHandler } from "../src/middleware/errorHandler";
import chalk from "chalk";


let port = _config.port


app.use(notFoundHandler);
app.use(((err: any, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next)) as unknown as express.ErrorRequestHandler);


process.on("unhandledRejection", (reason, promise) => {
    console.error(chalk.red("Unhandled Rejection:", promise, "Reason:", reason));
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    console.error(chalk.red("Uncaught Exception:", error));
    process.exit(1);
});


app.listen(port, () => {
    console.log("Listion Port", port);
})