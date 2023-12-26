import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { verifyToken } from "src/helpers/units";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(){

    }

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        // const clientToken = req.headers.authorization.replace("Bearer ","")
        const clientToken = req.headers.authorization;
        try{
            const decoded = await verifyToken(
                clientToken,
                process.env.TOKEN_SECRET
            );

            req.user = decoded;
            return true;
        }
        catch(err){
            console.log("errrr ", err)
            return false;
        }
    }
}