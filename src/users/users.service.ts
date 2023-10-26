import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './users';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from 'src/role/role';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly user: Model<IUser>,
    @InjectModel('Role') private readonly roles: Model<IRole>,
  ) {}

  async create(user: IUser) {
    const { username } = user;

    try {
      const findUserUsername = await this.user.findOne({ username });
      if (findUserUsername)
        throw new BadRequestException('username already exists');

      // Query roles based on their names
      const roles = await this.roles.find({
        name: { $in: ['User'] },
      });

      // Extract role IDs from the queried roles
      const roleIds = roles.map((role) => role._id);

      // Create the new user and assign role IDs
      const newUser = await this.user.create({
        ...user,
        roles: roleIds, // Assign role IDs to the user
      });

      if (!newUser) {
        throw new BadGatewayException('Failed to create user');
      }
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findAll() {
    try {
      const users = await this.user.find().exec();
      if (!users) throw new NotFoundException('No users found');
      return { success: true, users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.user.findById(id).exec();
      if (!user) throw new NotFoundException('no user found by this id');
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(id: string, user: updateUserDto) {
    try {
      const { first_name, last_name } = user;
      const users = await this.user
        .findByIdAndUpdate(id, { first_name, last_name }, { new: true })
        .exec();
      if (!users) throw new BadRequestException('Failed to update user');
      return { success: true, user: users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async remove(id: string) {
    try {
      const user = await this.user.findByIdAndRemove(id).exec();
      if (!user)
        throw new BadRequestException('Failed to delete user by this id');
      return { success: true, message: 'user removed successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
