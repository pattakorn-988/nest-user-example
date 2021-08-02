import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private async findUser(id: string): Promise<UserDocument> {
    let user;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user as UserDocument;
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    const newUser = new this.userModel(createUserDto);
    const result = await newUser.save();
    return result.id as string;
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users as User[];
  }

  async findOne(id: string) {
    return await this.findUser(id);
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
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
    return { deleted: result.n };
  }
}
