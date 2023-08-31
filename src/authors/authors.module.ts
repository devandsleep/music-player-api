import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Authors } from './authors.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [
    // forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Authors]),
    FilesModule,
  ],
  exports: [
    AuthorsService,
  ]
})
export class AuthorsModule { }
