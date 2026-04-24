// ============================================================
// middleware/index.js — Custom Middleware Functions
// CSC-251 Assignment 4 — Demonstrates middleware usage
// ============================================================

/**
 * requestLogger — Logs method, URL, timestamp, and response time
 * Applied globally in server.js
 */
function requestLogger(req, res, next) {
  const start = Date.now();
  req.requestTime = new Date().toISOString();

  // Intercept res.finish to log response time
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status   = res.statusCode;
    const color    = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[32m';
    console.log(`${color}[${req.requestTime}] ${req.method} ${req.url} → ${status} (${duration}ms)\x1b[0m`);
  });

  next();
}

/**
 * validateContentType — Ensures POST/PUT requests send JSON
 */
function validateContentType(req, res, next) {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const ct = req.headers['content-type'] || '';
    if (!ct.includes('application/json')) {
      return res.status(415).json({
        success: false,
        message: 'Content-Type must be application/json for POST/PUT requests'
      });
    }
  }
  next();
}

/**
 * notFoundHandler — 404 handler for undefined routes
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
    availableRoutes: [
      'GET  /api/students',
      'GET  /api/courses',
      'GET  /api/grades',
      'GET  /api/dashboard/stats',
    ]
  });
}

/**
 * globalErrorHandler — Catches any unhandled errors
 */
function globalErrorHandler(err, req, res, next) {
  console.error('\x1b[31m[ERROR]\x1b[0m', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = {
  requestLogger,
  validateContentType,
  notFoundHandler,
  globalErrorHandler,
};
