import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';
import * as fs from 'fs';
import * as path from 'path';

const { LOGGER_FILE_SIZE = 1024 } = process.env;
const { LOGGER_LEVEL = 4 } = process.env;

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly logsFileName = path.join(process.cwd(), 'logs', 'current.log');
  private readonly errorsFileName = path.join(process.cwd(), 'logs', 'error.log');

  constructor(context: string) {
    super(context, { logLevels: logLevels.slice(0, 1 + Number(LOGGER_LEVEL)) });
  }

  log(message: any, ...optionalParams) {
    super.log(message, ...optionalParams);
    this.logToFile('log', message);
  }

  error(message: any, ...optionalParams) {
    super.error(message, ...optionalParams);
    this.logToFile('error', message);
  }

  warn(message: any, ...optionalParams) {
    super.warn(message, ...optionalParams);
    this.logToFile('warn', message);
  }

  debug(message: any, ...optionalParams) {
    super.debug(message, ...optionalParams);
    this.logToFile('debug', message);
  }

  verbose(message: any, ...optionalParams) {
    super.verbose(message, ...optionalParams);
    this.logToFile('verbose', message);
  }

  private logToFile(level: LogLevel, message: any) {
    if (this.isLevelEnabled(level)) {
      this.writeToFile(level, `${level.toUpperCase()} - ${new Date().toISOString()} - ${message}`);
    }
  }

  private writeToFile(level: LogLevel, message: string) {
    const fileName = level === 'error' ? this.errorsFileName : this.logsFileName;

    const stat = fs.statSync(fileName, { throwIfNoEntry: false });
    if (stat) {
      // Rename log chunk
      if (stat.size >= Number(LOGGER_FILE_SIZE) * 1024)
        fs.renameSync(fileName, `${fileName}.${new Date().toISOString().replace(':', '-')}`);
    } else fs.mkdirSync(path.dirname(fileName), { recursive: true });
    fs.appendFileSync(fileName, `${message}\n`);
  }
}
