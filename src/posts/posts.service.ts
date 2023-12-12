import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { IPosts } from './post.interface';
import { filterRequest, optionsRequest } from 'src/helpers/units';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private readonly postsModel: PaginateModel<Posts>,
  ) {}

  async creatPost(body: IPosts) {
    return this.postsModel.create(body);
  }

  async updatePost(id: string, body: IPosts) {
    const post = await this.postsModel.findOne({ _id: id, is_deleted: false });
    if (!post) {
      throw new NotFoundException('Not foud post');
    }
    return await this.postsModel.findByIdAndUpdate(id, body, { new: true });
  }

  async findPost(id: string){
    const post = await this.postsModel.findOne({_id: id, is_deleted: false});
    if (!post) {
        throw new NotFoundException('Not foud post');
    }
    return post.view();
  }

  async fillAllPost(queryObj: any){
    const query = filterRequest(queryObj, true)
    let options = optionsRequest(queryObj)
    if(queryObj.limit&&queryObj.limit === '0'){
        options.pagination = false;
    }
    return await this.postsModel.paginate(query,options).then(data=>({...data, docs: data.docs.map(item => item.view())}))
  }
  async deletePost(id: string, body: IPosts){
    const post = await this.postsModel.findOne({_id: id, is_deleted: false})
    if(!post){
        throw new NotFoundException("Not Found Post")
    }
    return await this.postsModel.findByIdAndUpdate(id, body,{new: true})
  }
}
