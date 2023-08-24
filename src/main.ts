import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const DB_URL = process.env.MONGO_URL
  
  await mongoose.connect(DB_URL)
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT}`));
}
bootstrap();
