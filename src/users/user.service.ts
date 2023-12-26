import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ILogin, IUser } from './user.interface';
import { User } from './user.schema';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { filterRequest, generateToken, optionsRequest } from 'src/helpers/units';
import { PlayloadJwt } from 'src/auth/auth.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: PaginateModel<User>,
  ) {}
  async createUser(user: IUser) {
    const userInDb = await this.userModel.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (userInDb) {
      if (user.username === userInDb.username) {
        throw new HttpException('User da ton tai', HttpStatus.BAD_REQUEST);
      }
      if (user.email === userInDb.email) {
        throw new HttpException('Email da ton tai', HttpStatus.BAD_REQUEST);
      }
    }

    user.password = this.encryptPassword(user.password);
    return (await this.userModel.create(user)).view();
  }

  async userInfo(id: string){
    const user= await this.userModel.findById(id);
    if(!user) throw new NotFoundException("Khong tim thay user");
    return user.view();
  }
  async loginUser(user: ILogin) {
    const userLogin = await this.userModel.findOne({username: user.username, is_deleted:false})
    if(!userLogin){
      throw new BadRequestException('Tai khoan hoac mat khau khong chinh xac');
    }
    if(!this.comparePassword(user.password,userLogin.password)){
      throw new BadRequestException('Tai khoan hoac mat khau khong chinh xac');
    }
    console.log("userLogin ", userLogin)
    return await this.updateToken(userLogin._id.toString() ,user.username)
  }

  async updateToken(userId: string, username: string){
    let dateToken: PlayloadJwt={
      user_id: userId,
      username: username
    }
    const token = await generateToken(dateToken, process.env.TOKEN_SECRET, process.env.TIME_EXPRI_TOKEN)
    return {
      ...dateToken,
      token
    }
  }

  async deleteUser(id: string) {
    const user = await this.userModel.findOne({_id:id, is_deleted: false})
    if(!user){
        throw new NotFoundException("Not found user id");
    }
    return await this.userModel.findByIdAndDelete(id);
  }

  async updateUser(id: string, body: IUser){
    const user = await this.userModel.findOne({ _id: id, is_deleted: false});
    if(!user){
        throw new NotFoundException("Not found user id");
    }
    return await this.userModel.findByIdAndUpdate(id, body, {new: true});
  }

  async findAll(queryObj : any){
    const query = filterRequest(queryObj, true)
    let options = optionsRequest(queryObj)
    if(queryObj.limit&&queryObj.limit === '0'){
        options.pagination = false;
    }
    return await this.userModel.paginate(query,options).then(data=>({...data, docs: data.docs.map(item => item.view())}))
  }

  encryptPassword(plainText: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
  }

  comparePassword(plainText: string, encryptPassowd: string) {
    return bcrypt.compareSync(plainText, encryptPassowd);
  }
}
