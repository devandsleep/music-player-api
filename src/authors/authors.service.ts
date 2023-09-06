import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Authors } from './authors.model';
import { AuthorDataDto } from './dto/author-create.dto';
import { FilesService } from 'src/files/files.service';
import { AuthorAboutDto } from './dto/author-about.dto';
import { AuthorUpdateDto } from './dto/author-update.dto';


@Injectable()
export class AuthorsService {

    constructor(@InjectModel(Authors) private authorRepository: typeof Authors, private filesService: FilesService) { }

    async getAllAuthors() {
        const authors = await this.authorRepository.findAll({ include: { all: true } });
        return authors;
    }

    async getPopularAuthors() {
        const authors = await this.authorRepository.findAll({ include: { all: true }, limit: 5 })
        return authors
    }

    async getAuthorByName(name: string) {
        const { Op } = require('sequelize');
        const authors = await this.authorRepository.findAll({
            where: {
                username: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        return authors
    }

    async createAuthor(dto: AuthorDataDto) {
        const user = await this.authorRepository.create(dto)
        return user;
    }

    async updateAuthor(id: string, dto: AuthorUpdateDto, avatar: Express.Multer.File[]) {
        const author = await this.authorRepository.findByPk(id)
        if (author) {
            const avatarName = await this.filesService.createFile(avatar);

            const fs = require('fs');
            fs.unlink(`${process.cwd()}/static/images/${author.avatar}`, () => { });

            return await this.authorRepository.update({
                ...dto,
                avatar: avatarName,
            }, { where: { id }, returning: true })
        }
        throw new NotFoundException('Author not found.');
    }

    async updateAvatar(id: string, avatar: any) {
        const author = await this.authorRepository.findByPk(id)
        if (author) {
            const avatarName = await this.filesService.createFile(avatar);

            const fs = require('fs');
            fs.unlink(`${process.cwd()}/static/images/${author.avatar}`, () => { });

            const updatedAuthor = await this.authorRepository.update({
                ...author,
                avatar: avatarName
            }, { where: { id }, returning: true })
            return updatedAuthor
        }
        throw new NotFoundException('Author not found.');
    }

    async updateAbout(id: string, dto: AuthorAboutDto) {
        const author = await this.authorRepository.findByPk(id)
        if (author) {
            return await this.authorRepository.update({
                ...author,
                about: dto.about,
            }, { where: { id }, returning: true })
        }
        throw new NotFoundException('Author not found.');
    }

    async deleteAuthor(id: string) {
        const author = await this.authorRepository.findByPk(id)
        if (author) {
            const fs = require('fs');
            fs.unlink(`${process.cwd()}/static/images/${author.avatar}`, () => { });
            return await author.destroy()
        }
        throw new NotFoundException('Author not found.');
    }
}
