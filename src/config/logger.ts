import winston from 'winston'

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'grey'
  }
}

const customFormat = winston.format.printf(
  ({ timestamp, level, message, ...meta }) => {
    let logMessage = `${timestamp} [${level}]: ${message}`

    if (Object.keys(meta).length) {
      logMessage += ` | ${JSON.stringify(meta)}`
    }

    return logMessage
  }
)

const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        customFormat
      ),
      level: 'debug'
    }),
    // File transport
    new winston.transports.File({
      filename: 'app.log',
      format: winston.format.combine(winston.format.timestamp(), customFormat),
      level: 'info'
    })
  ]
})

export default logger
