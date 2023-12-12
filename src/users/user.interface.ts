import { EuserRole, EuserStatus } from "./user.enum";

export interface IUser {
    id?: string;
    fullname?: string;
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    is_deleted?:boolean;
    role?: `${EuserRole}`;
    status?: `${EuserStatus}`;
}

export class IUserQuery{
    page?: string;
    limit?: string;
    username?: string;
    status?: `${EuserStatus}`;
}

export class IChangePassword{
    old_password: string;
    new_password: string;
}

export class ILogin{
    username: string;
    password: string;
}