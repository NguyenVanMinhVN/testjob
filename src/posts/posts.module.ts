import { Module, Post } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Posts } from './post.schema';
import { AdminPostController } from './admin-post.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
            name: Posts.name,
            schema: PostSchema
        }
    ])
],
  controllers: [PostsController, AdminPostController],
  providers: [PostsService]
})
export class PostsModule {}
