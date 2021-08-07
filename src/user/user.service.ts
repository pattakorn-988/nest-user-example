import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user || user.deletedAt !== null) {
      throw new NotFoundException('Could not find user.');
    }
    return user as User;
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    return result.id as string;
  }

  async findAll() {
    const users = await this.userModel.find({ deletedAt: null }).exec();
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      description: user.description,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    }));
  }

  async findOne(id: string) {
    const user = await this.findUser(id);
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      description: user.description,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUser(id);
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.description = updateUserDto.description;

    await user.save();
    return { message: `User ID: ${id} updated` };
  }

  async remove(id: string) {
    // const result = await this.userModel.deleteOne({ _id: id }).exec();
    // if (result.n === 0) {
    //   throw new NotFoundException('Could not find user.');
    // }
    const user = await this.findUser(id);
    user.deletedAt = new Date();
    await user.save();
    return { message: `User ID: ${id} soft deleted` };
  }
}
