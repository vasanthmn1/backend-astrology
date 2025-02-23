import express, { NextFunction, Request, Response } from "express";
import app from "../index";
import _config from "../src/config/config";
import { errorHandler, notFoundHandler } from "../src/middleware/errorHandler";


let port = _config.port


app.use(notFoundHandler);
app.use(((err: any, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next)) as unknown as express.ErrorRequestHandler);

app.listen(port, () => {
    console.log("Listion Port", port);
})