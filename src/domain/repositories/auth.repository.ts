import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";



export abstract class AuthRepository{ // abstract porque no quiero crear instancias de esta clase. En lugar de eso, se utiliza como una clase base para otras clases


    // Todo:
    abstract login( loginUserDto: LoginUserDto ):Promise<UserEntity>


    abstract register( registerUserDto: RegisterUserDto ):Promise<UserEntity>


}

