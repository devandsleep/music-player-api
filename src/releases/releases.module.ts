import { Module } from '@nestjs/common';
import { ReleasesService } from './releases.service';
import { ReleasesController } from './releases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Release, ReleaseSchema } from './releases.scheme';
import { AuthorsRelease, AuthorsReleaseSchema } from 'src/authors/schemes/authors-releases.scheme';

@Module({
  providers: [ReleasesService],
  controllers: [ReleasesController],
  imports: [
    MongooseModule.forFeature([
      { name: Release.name, schema: ReleaseSchema },
      { name: AuthorsRelease.name, schema: AuthorsReleaseSchema }
    ]),
  ]
})
export class ReleasesModule {}
