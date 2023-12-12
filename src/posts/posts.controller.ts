import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { newPost } from './post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService){}
    @Post()
    async creatPost(@Body() body: newPost){
        return await this.postService;
    }

    
}
