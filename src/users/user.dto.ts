import { ApiProperty } from "@nestjs/swagger";
import { EuserRole,EuserStatus } from "./user.enum";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class UserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsAlphanumeric()
    @IsString()
    fullname: string;
}

export class CreateUserDto extends UserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({type: String, enum: EuserStatus})
    @IsOptional()
    @IsString()
    status: EuserStatus;

    @ApiProperty({type: String, enum: EuserRole})
    @IsOptional()
    @IsString()
    role: EuserRole;
}

export class UpdateUserDto extends UserDto{
    @ApiProperty({type: String, enum: EuserStatus})
    @IsOptional()
    @IsString()
    status: EuserStatus;

    @ApiProperty({type: String, enum: EuserRole})
    @IsOptional()
    @IsString()
    role: EuserRole;
}

export class UserQuery {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Page number', required: false})
    page: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Page size', required: false})
    limit: number;

    @ApiProperty({ description: 'Username', required: false})
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty({ description: 'Status', required: false, type: String, enum: EuserStatus})
    @IsOptional()
    @IsString()
    status: EuserStatus;
}

export class ChangePasswordDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    old_password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    new_password: string;
}

export class LoginDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}