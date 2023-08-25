import { Controller, Get } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authors } from './authors.model';

@ApiTags('Users')
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
