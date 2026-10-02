// Fallback for requests to routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the errorHandler
};

// Main error handler to format errors as JSON
const errorHandler = (err, req, res, next) => {
  // If the status is still 200 but an error was thrown, make it a 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    // Only show the messy stack trace in development, hide it in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };