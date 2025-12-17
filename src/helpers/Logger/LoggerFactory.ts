import {ILogger, ILoggerOptions} from '../../interfaces';
import {Log4js} from './Log4js';

export class LoggerFactory {
    logger: ILogger;
    options: ILoggerOptions;

    constructor(options: ILoggerOptions) {
        this.options = options;

        this.logger = new Log4js(options);
    }

    static configure(options: ILoggerOptions): ILogger {
        return new LoggerFactory(options).logger;
    }
}
