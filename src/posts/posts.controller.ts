import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto, PostQueryDto, UpdatePostDto, newPost } from './post.dto';
import { query } from 'express';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/decorators/role.decorator';

@ApiBearerAuth('Authorization')
@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService){}
    @Post()
    @Auth()
    async creatPost(@Body() body: newPost){
        return await this.postService.creatPost(body);
    }

    @Put(':id')
    @Auth()
    @ApiOperation({summary:"Update post for admin role"})
    async udatedPost(@Param('id') id: string,@Body() body: UpdatePostDto){
        return await this.postService.updatePost(id, body);
    }

    @Get('list')
    @Auth()
    async findAllPost(@Query() query: PostQueryDto){
        console.log("findAllPost");
        return this.postService.fillAllPost(query);
    }

    @Get(':id')
    @Auth()
    async findPost(@Param('id') id: string){
        console.log("this.findPost");
        return await this.postService.findPost(id);
    }

    @Delete(':id')
    @Auth()
    async deletePost(@Param('id') id: string ){
        return this.postService.updatePost(id, {is_deleted: true});
    }

}
