import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Authors } from './authors.model';
import { ReleaseDto } from '../releases/dto/release.dto';
import { Release } from '../releases/releases.scheme';

@Controller('authors')
export class AuthorsController {

    constructor(private authorsService: AuthorsService) {}

    @ApiOperation({summary: 'get all authors'})
    @ApiResponse({status: 200, type: [Authors]})
    @Get()
    getAll() {
        return this.authorsService.getAllAuthors();
    }
}
