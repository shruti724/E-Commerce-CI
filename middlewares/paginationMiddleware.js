// middleware/paginationMiddleware.js

const paginationMiddleware = (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  // Set default pagination values and sanitize inputs
  req.pagination = {
    page: Math.max(Number(page), 1),
    limit: Math.max(Number(limit), 1),
    skip: (Math.max(Number(page), 1) - 1) * Math.max(Number(limit), 1),
    limit: Math.min(Number(limit), 100), // Optional: Limit max limit to prevent excessive load
  };

  next();
};

module.exports = paginationMiddleware;
