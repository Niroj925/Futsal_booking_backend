import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import logger from 'src/utils/logger.util';

@Injectable()
export class ErrorLoggerMiddleware implements NestMiddleware {
  private morganErrorFormat: morgan.FormatFn = (tokens: any, req: any, res: any) => {
    if (res.statusCode >= 400) {
      return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        message: tokens['response-time'](req, res) + 'ms',
        timestamp: tokens['date'](req, res, 'clf'),
      });
    }
    return null; // Skip logging for non-error responses
  };

  private morganInstance = morgan(this.morganErrorFormat, {
    stream: {
      write: (message: string) => {
        if (message) {
          logger.error(message.trim());
        }
      },
    },
    skip: (req: Request, res: Response) => res.statusCode < 400, // Skip non-error responses
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.morganInstance(req, res, next);
  }
}
