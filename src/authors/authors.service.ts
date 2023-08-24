import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectModel as InjectMongo } from '@nestjs/mongoose';
import { Authors } from './authors.model';
import { Release } from './releases.scheme';
import * as mongoose from 'mongoose';



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

    async createRelease() {
        const createdRelease = await this.releaseModel.create({
            id: 1,
            title: 'My Single',
            preview: 'eminem.jpg',
            tracks: [{
                track_id: 1,
                authors: [1, 2, 3],
                is_drop: false
            }],
            createdAt: Date.now(),
            release_date: Date.now()
        });
        return createdRelease;
    }
}
