import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MusicModule } from './music/music.module';
import { AuthorsModule } from './authors/authors.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReleasesModule } from './releases/releases.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    MongooseModule.forRoot("mongodb+srv://devandsleep:YbEjdX26y33021TN@cluster0.s8yeyxo.mongodb.net/?retryWrites=true&w=majority"),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Users],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    MusicModule,
    AuthorsModule,
    ReleasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
