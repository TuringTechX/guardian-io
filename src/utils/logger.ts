import winston from 'winston';

// Logger setup using Winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

export const logInfo = (message: string) => {
    logger.info(message);
};

export const logError = (message: string, error?: any) => {
    logger.error(message, error);
};
