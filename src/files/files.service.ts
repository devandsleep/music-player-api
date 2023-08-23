import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import * as multer from 'multer';


@Injectable()
export class FilesService {

    async createFile(file: any): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', '..', 'static', 'images')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.join(filePath, fileName), file[0].buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Error on image file recording', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // @this.upload.single('audio') // 'audio' should match the field name in the form
    async createAudioFile(file: Express.Multer.File): Promise<string> {
        try {
            const fileName = uuid.v4() + '.mp3'; // Use appropriate extension for audio files
            const filePath = path.resolve(__dirname, '..', '..', 'static', 'music');

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }

            fs.writeFileSync(path.join(filePath, fileName), file[0].buffer);
            return fileName;
        } catch (e) {
            throw new HttpException('Error on audio file recording', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
