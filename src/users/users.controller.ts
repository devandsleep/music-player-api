import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDataDto } from './dto/user-data.dto';
import { Users } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'create new user'})
    @ApiResponse({status: 200, type: Users})
    @Post()
    create(@Body() userDto: UserDataDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'get all users'})
    @ApiResponse({status: 200, type: [Users]})
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }
}
