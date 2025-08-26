import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import logger from 'src/utils/logger.util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private morganFormat: morgan.FormatFn = (tokens: any, req: any, res: any) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: req.baseUrl + req.path,
      status: tokens.status(req, res),
      responseTime: tokens['date'](req, res, 'clf'),
    });
  };

  private morganInstance = morgan(this.morganFormat, {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      },
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.morganInstance(req, res, next);
  }
}