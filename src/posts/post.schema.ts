import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IPosts } from "./post.interface";
import * as mongoseePaginate from 'mongoose-paginate-v2'

@Schema({timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}})
export class Posts extends Document{
    @Prop({type: String})
    id: string;
    @Prop({type: String})
    author: string;
    @Prop({type: String})
    tiltle: string;
    @Prop({type: String})
    subtiltle: string;
    @Prop({type: String})
    content: string;

    view: (full?: boolean) => IPosts
}

export const UserSchemaPost = SchemaFactory.createForClass(Posts);
UserSchemaPost.methods.view = function (full?: boolean): IPosts{
    const view: IPosts = {
        id : this._id,
        author: this.author,
        tiltle: this.tiltle,
        subtiltle: this.subtiltle,
        content: this.content
    }
    return full ? {...view} :view;
}

UserSchemaPost.plugin(mongoseePaginate);
