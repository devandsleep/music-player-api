import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const DB_URL = process.env.MONGO_URL
  await mongoose.connect(DB_URL)

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Music API')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('Alex Mayer')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  
  await app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));
}
bootstrap();
