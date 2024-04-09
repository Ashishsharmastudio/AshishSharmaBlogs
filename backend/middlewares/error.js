class ErrorHandeler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res,next) => {
    err.message = err.message   || "Internal server error";
    err.statusCode  = err.statusCode || 500;

    if(err.name === "CastError"){
        const message  = `Invalid Resource not FOUND ${err.path}`;
        err = new Error(message,404);
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandeler;