import { Body, Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostQueryDto, UpdatePostDto } from './post.dto';
import { Auth } from 'src/decorators/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('admin/post')
@Auth()
@ApiBearerAuth('Authorization')
export class AdminPostController {
    constructor(private readonly postService: PostsService){

    }

    @Get('list')
    async findAllList(@Query() query: PostQueryDto){
        return await this.postService.fillAllPost(query);
    }
    @Get(':id')
    async findPost(@Param('id') id: string, @Body() body: UpdatePostDto){
        return await this.postService.updatePost(id, body);
    }
    @Delete(':id')
    async deletedPost(@Param('id') id: string){
        return await this.postService.updatePost(id, {is_deleted: true});
    }
}
