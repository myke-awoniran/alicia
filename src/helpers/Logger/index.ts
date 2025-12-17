import {LoggerFactory} from './LoggerFactory';
import chalk from 'chalk';

const Logger = LoggerFactory.configure({
    id: chalk.green('TURNING'),
    level: 'all'
});

export {Logger};
