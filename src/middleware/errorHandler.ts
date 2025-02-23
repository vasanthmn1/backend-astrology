import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { ServiceResponse } from "../interface/ServiceResponse";

// Middleware to handle not found routes
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(createError(404, "Page not found"));
};

// Global error handler middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    console.error(`❌ ${status} - ${message}`);

    return res.status(status).json({
        status: "error",
        message,
        code: status,
    });
};