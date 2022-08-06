import { ConsoleLogger, ConsoleLoggerOptions, Injectable } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';
import * as util from 'util';
import * as fs from 'fs';
import * as path from 'path';

const LOGGER_FILE_SIZE = Number(process.env.LOGGER_FILE_SIZE) || 1024;

@Injectable()
export class LoggerService extends ConsoleLogger {
  private readonly logsFileName = path.join(process.cwd(), 'logs', 'current.log');
  private readonly errorsFileName = path.join(process.cwd(), 'logs', 'error.log');

  constructor(context: string, options: ConsoleLoggerOptions) {
    super(context, options);
  }

  log(message: any, ...optionalParams) {
    super.log(message, ...optionalParams);
    this.logToFile('log', message, ...optionalParams);
  }

  error(message: any, ...optionalParams) {
    super.error(message, ...optionalParams);
    this.logToFile('error', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams) {
    super.warn(message, ...optionalParams);
    this.logToFile('warn', message, ...optionalParams);
  }

  debug(message: any, ...optionalParams) {
    super.debug(message, ...optionalParams);
    this.logToFile('debug', message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams) {
    super.verbose(message, ...optionalParams);
    this.logToFile('verbose', message, ...optionalParams);
  }

  private logToFile(level: LogLevel, format: any, ...strings: string[]) {
    if (this.isLevelEnabled(level)) {
      const message = util.format(format, ...strings);
      this.writeToFile(level, message);
    }
  }

  private writeToFile(level: LogLevel, message: string) {
    const fileName = level === 'error' ? this.errorsFileName : this.logsFileName;

    const stat = fs.statSync(fileName, { throwIfNoEntry: false });
    if (stat) {
      // Rename log chunk
      if (stat.size >= LOGGER_FILE_SIZE * 1024)
        fs.renameSync(fileName, `${fileName}.${new Date().toISOString().replace(':', '-')}`);
    } else fs.mkdirSync(path.dirname(fileName), { recursive: true });
    fs.appendFileSync(fileName, `${message}\n`);
  }
}
