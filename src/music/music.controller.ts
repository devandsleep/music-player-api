import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MusicService } from './music.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MusicDataDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';


@ApiTags('Music')
@Controller('music')
export class MusicController {

    constructor(private musicService: MusicService) { }

    @ApiOperation({summary: 'get track by ID'})
    @Get(':id')
    async getTrackById(@Param('id') id: string) {
        return this.musicService.getTrackById(id)
    }

    @ApiOperation({summary: 'get popular tracks'})
    @Get()
    async getTrendingTracks() {
        return this.musicService.getTrending()
    }

    @ApiOperation({summary: 'add new track'})
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

    @ApiOperation({summary: 'update track by ID'})
    @Put(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'preview', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    async updateTrack(
        @Param("id") id: string,
        @Body() dto: UpdateMusicDto,
        @UploadedFiles() files: { preview: Express.Multer.File[], audio: Express.Multer.File[] }
    ) {
        return this.musicService.updateTrack(id, dto, files.preview, files.audio)
    }

    @ApiOperation({summary: 'delete track by ID'})
    @Delete(":id")
    async deleteTrack(@Param("id") id: string) {
        return this.musicService.deleteTrack(id)
    }

}
