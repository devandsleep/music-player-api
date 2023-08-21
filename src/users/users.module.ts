import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    // forwardRef(() => AuthModule),
    SequelizeModule.forFeature([Users]),
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
