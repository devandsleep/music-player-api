import { Injectable } from '@nestjs/common';
import { MusicDataDto } from './dto/create-music.dto';
import { FilesService } from 'src/files/files.service';
import { InjectModel } from '@nestjs/sequelize';
import { Music } from './music.model';

@Injectable()
export class MusicService {

    constructor(@InjectModel(Music) private musicRepository: typeof Music,
        private filesService: FilesService) { }

    async create(dto: MusicDataDto, preview: any, audio: any) {
        const previewName = await this.filesService.createFile(preview);
        const audioName = await this.filesService.createAudioFile(audio);
        const track = await this.musicRepository.create({
            ...dto,
            preview: previewName,
            audio: audioName
        });
        return track;
    }
}
