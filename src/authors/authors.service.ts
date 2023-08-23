import { Injectable } from '@nestjs/common';
import { Authors } from './authors.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthorsService {

    constructor(@InjectModel(Authors) private authorRepository: typeof Authors) { }

    async getAllAuthors() {
        const users = await this.authorRepository.findAll({ include: { all: true } })
        return users;
    }
}
