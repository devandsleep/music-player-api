import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDataDto } from 'src/users/dto/user-data.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService) {}

    async login(dto: UserDataDto) {
        const user = await this.validateUser(dto['params']);
        return this.generateToken(user);
    }

    async registration(dto: UserDataDto) {
        const candidate = await this.userService.getUserByUsername(dto['params'].username);
        if (candidate) {
            throw new HttpException('Such a user already exists', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(dto['params'].password, 5);
        const user = await this.userService.createUser({...dto['params'], password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: Users) {
        const payload = {email: user.username, id: user.id}
        return {
            token: this.jwtService.sign(payload),
            user_id: user.id
        }
    }

    private async validateUser(dto: UserDataDto) {
        const user = await this.userService.getUserByUsername(dto.username);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Wrong username or password'})
    }
}
