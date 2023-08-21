import { Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserDataDto } from './dto/user-data.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users) private userRepository: typeof Users) { }

  async createUser(dto: UserDataDto) {
    const user = await this.userRepository.create(dto)
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } })
    return users;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username }, include: { all: true } })
    return user;
  }
}
