import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Authors } from './authors.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MongooseModule } from '@nestjs/mongoose';
import { Release, ReleaseSchema } from './releases.scheme';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [
    // forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Authors]),
    MongooseModule.forFeature([{ name: Release.name, schema: ReleaseSchema }]),
  ],
  exports: [
    AuthorsService,
  ]
})
export class AuthorsModule { }
