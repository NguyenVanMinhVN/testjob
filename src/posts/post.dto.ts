import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class newPost{
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    author: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    tiltle: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    subtiltle: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    content: string;
}