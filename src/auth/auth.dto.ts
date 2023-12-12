import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    refreshToken : string;  
}

export class LoginDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username : string; 

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password : string;  
}