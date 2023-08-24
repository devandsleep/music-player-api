import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectModel as InjectMongo } from '@nestjs/mongoose';
import { Authors } from './authors.model';
import { Release } from './schemes/releases.scheme';
import * as mongoose from 'mongoose';
import { CreateReleaseDto } from './dto/release-create.dto';



@Injectable()
export class AuthorsService {

    constructor(
        @InjectModel(Authors) private authorRepository: typeof Authors,
        @InjectMongo(Release.name) private releaseModel: mongoose.Model<Release>,
    ) { }

    async getAllAuthors() {
        const authors = await this.authorRepository.findAll({ include: { all: true } });
        return authors;
    }

    async createRelease(dto: CreateReleaseDto) {
        const createdRelease = await this.releaseModel.create(dto);
        return createdRelease;
    }
}
