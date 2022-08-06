import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, query, body } = req;
    this.logger.log(`[REQ] - ${method} | ${url} | ${JSON.stringify(query)} | ${JSON.stringify(body)} |`);

    res.on('finish', () => {
      this.logger.log(`[RES] - ${method} | ${url} | Status ${res.statusCode} |`);
    });

    next();
  }
}
