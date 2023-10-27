import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const port = process.env.PORT;
  const allowList = ['http://localhost:3000', 'http://localhost:3002'];

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'verbose'],
    rawBody: true,
    cors: {
      credentials: true, // Allow cookies to be sent with the request
      origin: (origin, callback) => {
        if (!origin || allowList.includes(origin)) {
          callback(null, true); // Allow the request
        } else {
          callback(new Error('Not allowed by CORS')); // Deny the request
        }
      },
      methods: 'GET,PUT,POST,DELETE,OPTIONS',
      optionsSuccessStatus: 204,
    },
  });
  app.use(cookieParser());
  app.useBodyParser('json', { limit: '30mb' });
  app.setGlobalPrefix('api');
  app.use(helmet());

  await app.listen(port ? parseInt(port) : 2517);
  Logger.verbose(`Aristore server started on port ${port}!\n`);
}
bootstrap();
