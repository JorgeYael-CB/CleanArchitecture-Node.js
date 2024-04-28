import { AuthDataSource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";



export class AuthRepositoryImpl implements AuthRepository{


    constructor(
        private readonly datasource: AuthDataSource,
    ){}


    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.datasource.login( loginUserDto );
    };


    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.register( registerUserDto )
    }

}