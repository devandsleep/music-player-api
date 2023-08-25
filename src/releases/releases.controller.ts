import { Controller, Get, Put, Post, Delete, Body, Param } from '@nestjs/common';
import { ReleasesService } from './releases.service';
import { ReleaseDto } from './dto/release.dto';
import { Release } from './releases.scheme';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Releases')
@Controller('releases')
export class ReleasesController {

    constructor(private releasesService: ReleasesService) {}

    @ApiOperation({summary: 'get all authors'})
    @ApiResponse({status: 200, type: [Release]})
    @Get('releases')
    getAll() {
        return this.releasesService.findAllReleases()
    }

    @ApiOperation({summary: 'create release'})
    @Post('release')
    createRelease(@Body() releaseDto: ReleaseDto) {
        return this.releasesService.createRelease(releaseDto);
    }

    @ApiOperation({summary: 'get release by ID'})
    @Get('release/:id')
    getById(@Param('id') id: string): Promise<Release> {
        return this.releasesService.findReleaseById(id)
    }

    @ApiOperation({summary: 'update release by ID'})
    @Put('release/:id')
    updateRelease(@Param("id") id: string, @Body() release: ReleaseDto): Promise<Release> {
        return this.releasesService.updateReleaseById(id, release)
    }

    @ApiOperation({summary: 'delete release by ID'})
    @Delete('release/:id')
    deleteById(@Param('id') id: string): Promise<Release> {
        return this.releasesService.deleteReleaseById(id)
    }
    
}
