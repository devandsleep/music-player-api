import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Authors } from './authors.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MongooseModule } from '@nestjs/mongoose';
import { Release, ReleaseSchema } from '../releases/releases.scheme';
import { AuthorsRelease, AuthorsReleaseSchema } from './schemes/authors-releases.scheme';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [
    // forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Authors]),
    FilesModule,
  ],
  exports: [
    AuthorsService,
  ]
})
export class AuthorsModule { }
