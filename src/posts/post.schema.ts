import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IPosts } from "./post.interface";
import * as mongoseePaginate from 'mongoose-paginate-v2'
import { Document } from "mongoose";

@Schema({timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}})
export class Posts extends Document{
    @Prop({type: String})
    id: string;
    @Prop({type: [String]})
    tag: string[];
    @Prop({type: String})
    author: string;
    @Prop({type: String})
    tiltle: string;
    @Prop({type: String})
    subtiltle: string;
    @Prop({type: String})
    content: string;
    @Prop({type: Boolean, default: false})
    is_deleted: boolean;

    view: (full?: boolean) => IPosts
}

export const PostSchema = SchemaFactory.createForClass(Posts);
PostSchema.methods.view = function (full?: boolean): IPosts{
    const view: IPosts = {
        id : this._id,
        author: this.author,
        tiltle: this.tiltle,
        subtiltle: this.subtiltle,
        content: this.content
    }
    return full ? {...view} :view;
}

PostSchema.plugin(mongoseePaginate);
