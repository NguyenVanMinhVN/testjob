import { UseGuards, applyDecorators } from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"

export const Auth = ()=>{
    return applyDecorators(UseGuards(AuthGuard))
}