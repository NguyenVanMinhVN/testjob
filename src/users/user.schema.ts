import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { EuserRole, EuserStatus } from "./user.enum";
import { IUser } from "./user.interface";

@Schema({timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}})
export class User extends Document{
    @Prop({type: String})
    fullname: string;
    @Prop({type: String})
    email: string;
    @Prop({type: String})
    phone: string;
    @Prop({type: String})
    username: string;
    @Prop({type: String})
    password: string;
    @Prop({type: String, default: EuserRole.USER})
    role: string;
    @Prop({type: String, default: EuserStatus.ACTIVE})
    status: string;
    @Prop({type: Boolean, default: false})
    is_deleted : boolean;

    view: (full?: boolean) => IUser
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.view = function (full?: boolean): IUser{
    const view : IUser = {
        id: this._id,
        fullname: this.fullname,
        email: this.email,
        phone: this.phone,
        role: this.role,
        status: this.status
    };
    return full ? {...view}: view;
}

UserSchema.plugin(mongoosePaginate);