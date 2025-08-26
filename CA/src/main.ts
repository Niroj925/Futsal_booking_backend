import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationException } from './application/exception/validation.exception';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser = require('cookie-parser');
import passport = require('passport');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  // Middleware to parse cookies
  app.use(cookieParser());

  app.use(passport.initialize()); 

  // prefix
  app.setGlobalPrefix('api');

  // -- Cors setup
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  //  validation pipe
  app.useGlobalPipes(
    // new ParseFormDataJsonPipe({field: 'body'}),
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        // console.log(errors);
        return new ValidationException(errors);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Futsal API')
    .setDescription('API description for Futsal')
    .setVersion('1.0')
    .addTag('futsal')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port, () => {
    Logger.log(`Server running on port ${port}`, 'Bootstrap');
  });
}
bootstrap();
