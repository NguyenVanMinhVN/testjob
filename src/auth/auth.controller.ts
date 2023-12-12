import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }

    @Post('login')
    @ApiOperation({summary: 'API login'})
    async login(@Body() body: LoginDto){
        return await this.authService;
    }
}
