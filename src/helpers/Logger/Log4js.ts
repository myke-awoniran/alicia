import log4js from 'log4js';
import { ILogger, ILoggerOptions } from '../../interfaces';
// import { SlackService } from '../../services';
import chalk from 'chalk';


export class Log4js implements ILogger {
    logger: log4js.Logger;

    constructor(options: ILoggerOptions) {
        log4js.configure({
            appenders: { [options.id]: { type: 'console', layout: { type: 'basic' } } },
            categories: { default: { appenders: [options.id], level: options.level || 'error' } }
        });

        this.logger = log4js.getLogger(options.id);
    }

    Info(...info: any): void {
        const message = chalk.yellow(info);
        this.logger.info(message);
    }

    Error(...error: any): void {
        const message = this.SerializeMessage(error);
        // new SlackService().SendErrorLog(`Critical=>:::${message}`);
        this.logger.error(chalk.red(message));
    }

    Warn(...message: any): void {
        const serializedMessage = this.SerializeMessage(message);
        // new SlackService().SendErrorLog(`Critical=>:::${serializedMessage}`);
        this.logger.warn(serializedMessage);
    }

    private SerializeMessage(message: any[]): string {
        return message.map((m) => typeof m === 'object' ? JSON.stringify(m) : m).join(' ');
    }
}
