import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PostDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    tag: string[];


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tiltle: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    subtiltle: string;

    @ApiPropertyOptional()
    @IsString()
    content: string;
}

export class newPost extends PostDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    author: string;
}

export class UpdatePostDto extends PostDto{

}

export class PostQueryDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Page number', required: false})
    page: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Page size', required: false})
    limit: number;

    @ApiProperty({required: false})
    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    tag: string[];


    @ApiProperty({required: false})
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    tiltle: string;
}