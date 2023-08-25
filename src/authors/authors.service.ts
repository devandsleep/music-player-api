import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Authors } from './authors.model';


@Injectable()
export class AuthorsService {

    constructor(@InjectModel(Authors) private authorRepository: typeof Authors) { }

    async getAllAuthors() {
        const authors = await this.authorRepository.findAll({ include: { all: true } });
        return authors;
    }
}
