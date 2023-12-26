import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto, LoginDto, UpdateUserDto, UserQuery } from "./user.dto";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/decorators/role.decorator";

@ApiBearerAuth('Authorization')
@ApiTags('User managements')
@Controller('users')
export class UserController{
    constructor( private readonly userService: UserService){
    }
    @Post('regiter')
    async creatUsers(@Body() body:CreateUserDto){
        console.log("Userrr ", body)
        return await this.userService.createUser(body);
    }
    @Post('Login')
    async Login(@Body() body: LoginDto){

        return this.userService.loginUser(body)
    }
    @Auth()
    @Get('me')
    async myInfomation(@Req() req: {user: {user_id: string}}){
        return this.userService.userInfo(req.user.user_id);
    }

    @Put(':id')
    @Auth()

    async updateUsers(@Param('id') id: string, body: UpdateUserDto){
        return this.userService.updateUser(id, body);
    }
    @Get('list')
    @Auth()
    async getAllUser(@Query() query: UserQuery){
        return this.userService.findAll(query);
    }
    @Delete(':id')
    @Auth()

    deleteUser(@Param('id') id: string){
        return this.userService.updateUser(id,{is_deleted: true});
    }
}