/**
 * Custom Error Response class for API errors
 * Extends Error with statusCode and additional metadata
 */
class ErrorResponse extends Error {
    constructor(message, statusCode, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = 'Bad Request', errors = null) {
        return new ErrorResponse(message, 400, errors);
    }

    static unauthorized(message = 'Unauthorized') {
        return new ErrorResponse(message, 401);
    }

    static forbidden(message = 'Forbidden') {
        return new ErrorResponse(message, 403);
    }

    static notFound(message = 'Not Found') {
        return new ErrorResponse(message, 404);
    }

    static conflict(message = 'Conflict') {
        return new ErrorResponse(message, 409);
    }

    static internal(message = 'Internal Server Error') {
        return new ErrorResponse(message, 500);
    }

    static validation(errors) {
        return new ErrorResponse('Validation Error', 422, errors);
    }
}

export default ErrorResponse;
