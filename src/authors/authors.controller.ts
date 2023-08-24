import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Authors } from './authors.model';
import { CreateReleaseDto } from './dto/release-create.dto';

@Controller('authors')
export class AuthorsController {

    constructor(private authorsService: AuthorsService) {}

    @ApiOperation({summary: 'get all authors'})
    @ApiResponse({status: 200, type: [Authors]})
    @Get()
    getAll() {
        return this.authorsService.getAllAuthors();
    }

    @Get('subscribe')
    subRelease() {
        this.authorsService.subscribeRelease()
        return "subscribed";
    }

    @Post('release')
    createRelease(@Body() releaseDto: CreateReleaseDto) {
        return this.authorsService.createRelease(releaseDto);
    }


}
