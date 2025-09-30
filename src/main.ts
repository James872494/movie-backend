// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { join } from 'path';
// import { NestExpressApplication } from '@nestjs/platform-express';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   // Enable CORS so your frontend can access the backend
//   app.enableCors({
//     origin: '*', // or restrict to your frontend URL like 'http://localhost:5173'
//   });

//   // Serve the uploads folder as static assets
//   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
//     prefix: '/uploads/', // now accessible via http://localhost:3000/uploads/...
//   });

//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the 'uploads' folder
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // URL will be http://yourdomain.com/uploads/...
  });

  // Enable CORS for any origin
  app.enableCors({
    origin: 'https://movielocker-pro.vercel.app',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();
