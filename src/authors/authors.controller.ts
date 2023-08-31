import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authors } from './authors.model';
import { AuthorDataDto } from './dto/author-create.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthorAboutDto } from './dto/author-about.dto';
import { AuthorUpdateDto } from './dto/author-update.dto';


@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {

    constructor(private authorsService: AuthorsService) {}

    @ApiOperation({summary: 'get all authors'})
    @ApiResponse({status: 200, type: [Authors]})
    @Get()
    getAll() {
        return this.authorsService.getAllAuthors();
    }

    @ApiOperation({summary: 'create new author'})
    @ApiResponse({status: 200, type: [Authors]})
    @Post('create')
    createAuthor(@Body() dto: AuthorDataDto) {
        return this.authorsService.createAuthor(dto);
    }

    // @Post('avatar/:id')
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'avatar', maxCount: 1 },
    // ]))
    // updateAuthor(@Param('id') id: string, @UploadedFiles() files: { avatar: Express.Multer.File[] }) {
    //     console.log(files.avatar)
    //     return this.authorsService.updateAvatar(id, files.avatar)
    // }

    @ApiOperation({summary: 'update author by ID'})
    @ApiResponse({status: 200, type: [Authors]})
    @Put('avatar/:id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'avatar', maxCount: 1 },
    ]))
    updateAuthor(
        @Param('id') id: string, 
        @Body() dto: AuthorUpdateDto,
        @UploadedFiles() files: { avatar: Express.Multer.File[] }) {
        console.log(files.avatar)
        return this.authorsService.updateAuthor(id, dto, files.avatar)
    }

    @ApiOperation({summary: 'set avatar image'})
    @Post('avatar/:id')
    @UseInterceptors(FileInterceptor('avatar'))
    updateAvatar(@Param('id') id: string, @UploadedFile() avatar) {
        return this.authorsService.updateAvatar(id, [avatar])
    }
    
    @ApiOperation({summary: 'update author\'s about'})
    @Post('about/:id')
    updateAbout(@Param('id') id: string, @Body() dto: AuthorAboutDto) {
        return this.authorsService.updateAbout(id, dto)
    }

    @ApiOperation({summary: 'delete author by ID'})
    @Delete("author/:id")
    async deleteTrack(@Param("id") id: string) {
        return this.authorsService.deleteAuthor(id)
    }
}
