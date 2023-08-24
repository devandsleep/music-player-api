import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectModel as InjectMongo } from '@nestjs/mongoose';
import { Authors } from './authors.model';
import { Release } from './schemes/releases.scheme';
import { AuthorsRelease } from './schemes/authors-releases.scheme';
import * as mongoose from 'mongoose';
import { CreateReleaseDto } from './dto/release-create.dto';



@Injectable()
export class AuthorsService {

    constructor(
        @InjectModel(Authors) private authorRepository: typeof Authors,
        @InjectMongo(Release.name) private releaseModel: mongoose.Model<Release>,
        @InjectMongo(AuthorsRelease.name) private authorsReleasesModel: mongoose.Model<AuthorsRelease>,
    ) { }

    async getAllAuthors() {
        const authors = await this.authorRepository.findAll({ include: { all: true } });
        return authors;
    }

    async createRelease(dto: CreateReleaseDto) {
        const createdRelease = await this.releaseModel.create(dto);
        return createdRelease;
    }

    async subscribeRelease() {
        const createdRelease = await this.authorsReleasesModel.create(
            {
                id: 1,
                author_id: 1,
                releases: [1, 2]
            }
        );
        return createdRelease;
    }
}
