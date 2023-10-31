import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './users';
import { RoleSchema } from 'src/role/role';
import { SharedModule } from 'src/auth/auth.gurard.shared';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    SharedModule,
  ],

  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
