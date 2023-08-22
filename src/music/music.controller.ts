import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MusicService } from './music.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MusicDataDto } from './dto/create-music.dto';
// import { Express } from 'express';

@ApiTags('Music')
@Controller('music')
export class MusicController {

    constructor(private musicService: MusicService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'preview', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    async addMusic(
        @Body() dto: MusicDataDto,
        @UploadedFiles() files: { preview: Express.Multer.File[], audio: Express.Multer.File[] }
    ) {
        return this.musicService.create(dto, files.preview, files.audio);
    }


    @Get()
    getMusic() {
        return "Hello"
    }

}
