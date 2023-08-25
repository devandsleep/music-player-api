import { Injectable, NotFoundException } from '@nestjs/common';
import { MusicDataDto } from './dto/create-music.dto';
import { FilesService } from 'src/files/files.service';
import { InjectModel } from '@nestjs/sequelize';
import { Music } from './music.model';
import { UpdateMusicDto } from './dto/update-music.dto';

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
            audio: audioName,
            // auditions: Math.floor(Math.random() * (100000 - 10000000 + 1)) + 10000000,
        });
        return track;
    }

    async updateTrack(id: string, dto: UpdateMusicDto, preview: any, audio: any) {
        const track = await this.musicRepository.findByPk(id)
        if (track) {
            const previewName = await this.filesService.createFile(preview);
            const audioName = await this.filesService.createAudioFile(audio);

            const fs = require('fs');
            fs.unlink(`${process.cwd()}/static/music/${track.audio}`, () => { });
            fs.unlink(`${process.cwd()}/static/images/${track.preview}`, () => { });

            return await this.musicRepository.update({
                ...dto,
                preview: previewName,
                audio: audioName,
                // auditions: Math.floor(Math.random() * (100000 - 10000000 + 1)) + 10000000,
            }, { where: { id }, returning: true })
        }
        throw new NotFoundException('Track not found.');
    }

    async deleteTrack(id: string) {
        const track = await this.musicRepository.findByPk(id)
        if (track) {
            const fs = require('fs');
            fs.unlink(`${process.cwd()}/static/music/${track.audio}`, () => { });
            fs.unlink(`${process.cwd()}/static/images/${track.preview}`, () => { });

            return await track.destroy()
        }
        throw new NotFoundException('Track not found.');
    }

    async getTrackById(id: string) {
        const track = await this.musicRepository.findByPk(id)
        if (track) {
            return track
        }
        throw new NotFoundException('Track not found.');
    }
}
