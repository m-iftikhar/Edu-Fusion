class ErrorHandler extends Error {
    statusCode: Number;
    constructor(message:any, statusCode:Number){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor);
    }
}

export default ErrorHandler;

// const ErrorHandler extends Error{
//     statusCode:Number;
//     constructor(message:any,StatusCode:Number){
//         super(message)
//         this.statusCode=STATUS_CODES;
//         Error.captureStackTrace(this,this.constructor);
//     }
// }
// export default ErrorHandler;