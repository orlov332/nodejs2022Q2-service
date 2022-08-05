import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  log(message: any, ...optionalParams) {
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams) {
    super.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams) {
    super.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams) {
    super.debug(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams) {
    super.verbose(message, ...optionalParams);
  }
}
