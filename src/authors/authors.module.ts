import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Authors } from './authors.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [
    // forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Authors]),
  ],
  exports: [
    AuthorsService,
  ]
})
export class AuthorsModule {}
