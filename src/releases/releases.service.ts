import { Injectable, NotFoundException } from '@nestjs/common';
import { Release } from './releases.scheme';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorsRelease } from 'src/authors/schemes/authors-releases.scheme';
import mongoose from 'mongoose';
import { ReleaseDto } from './dto/release.dto';

@Injectable()
export class ReleasesService {

    constructor(
        @InjectModel(Release.name) private releaseModel: mongoose.Model<Release>,
        @InjectModel(AuthorsRelease.name) private authorsReleasesModel: mongoose.Model<AuthorsRelease>,
    ) { }

    async findAllReleases(): Promise<Release[]> {
        const releases = await this.releaseModel.find();
        return releases;
    }

    async createRelease(dto: ReleaseDto) {
        const createdRelease = await this.releaseModel.create(dto);
        return createdRelease;
    }

    async updateReleaseById(id: string, release: ReleaseDto): Promise<Release> {
        return await this.releaseModel.findOneAndUpdate({ id: id }, release, {
            new: true,
            runValidators: true,
        });
    }

    async findReleaseById(id: string): Promise<Release> {
        const release = await this.releaseModel.findOne({ id: id });
        if (!release) {
            throw new NotFoundException('Release not found.');
        }
        return release;
    }

    async deleteReleaseById(id: string): Promise<Release> {
        return await this.releaseModel.findOneAndDelete({ id: id });
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
