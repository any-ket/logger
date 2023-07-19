const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;

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
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Create the logger instance with custom levels and colors
const logger = createLogger({
  levels: customLevels.levels,
  format: combine(colorize(), timestamp(), logFormat),
  transports: [
    new transports.Console(),
  ],
});

//setting to silly so that all above logs are shown
logger.level = "silly";

logger.log = (level, ...args) => {
  args = args.map(arg => {
    try{
      if(typeof arg === 'object')
        return JSON.stringify(arg);
      return arg;
    } catch(_error){
      return arg;
    }
  });

  const message = args.join(' ');
  logger[level](message);
};

module.exports = logger;
