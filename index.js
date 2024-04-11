const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize, errors } = format;

// Define custom log levels
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    silly: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'cyan',
    silly: 'magenta',
  },
};

// Define the log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  if (stack) {
    return `[${timestamp}] ${level}: ${message}\n${stack}`;
  }
  return `[${timestamp}] ${level}: ${message}`;
});

// Create the logger instance with custom levels and colors
const logger = createLogger({
  levels: customLevels.levels,
  format: combine(errors({ stack: true }), colorize(), timestamp(), logFormat),
  transports: [new transports.Console()],
});

// Setting the log level to "silly" so that all log messages are shown
logger.level = "silly";

// logger.log = (level, ...args) => {
//   let message = '';
//   let error;

//   args.forEach(arg => {
//     if (arg instanceof Error) {
//       error = arg;
//     } else {
//       if (typeof arg === 'object') {
//         message += JSON.stringify(arg) + ' ';
//       } else {
//         message += arg + ' ';
//       }
//     }
//   });

//   if (error) {
//     logger[level](message, error.stack);
//   } else {
//     logger[level](message);
//   }
// };

logger.exceptions.handle(new winston.transports.Console());

module.exports = logger;
