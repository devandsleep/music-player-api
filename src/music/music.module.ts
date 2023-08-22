import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { FilesModule } from 'src/files/files.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/users.model';
import { Music } from './music.model';

@Module({
  providers: [MusicService],
  controllers: [MusicController],
  imports: [
    SequelizeModule.forFeature([Users, Music]),
    FilesModule
  ],
})
export class MusicModule {}
