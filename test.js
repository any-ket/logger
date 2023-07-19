const logger = require(".");

logger.info("Information");
logger.error("Something went wrong!");
logger.debug("debugging");
logger.silly("new log");
logger.warn("this might be a problem!", 'new', {problem: "asdasd"});