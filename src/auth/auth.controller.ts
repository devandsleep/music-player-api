import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDataDto } from 'src/users/dto/user-data.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: UserDataDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: UserDataDto) {
        return this.authService.registration(userDto)
    }

}
