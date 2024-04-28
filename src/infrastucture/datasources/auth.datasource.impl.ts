import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";


type HashFn = ( pass:string ) => string;
type CompareFn = ( pass:string, hasPass: string ) => boolean;


export class AuthDataSourceImpl implements AuthDataSource{


    constructor(
        private readonly hashPass: HashFn = BcryptAdapter.hash,
        private readonly compareFn: CompareFn = BcryptAdapter.compare,
    ){}



    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        // Verificar si el email existe
        const user = await UserModel.findOne({email});
        if( !user ) throw CustomError.badRequest('Las credenciales no son validas')


        // Verificar que las contraseñas coincidan
        const validatePassword = this.compareFn(password, user.password);
        if( !validatePassword ) throw CustomError.badRequest('Los datos no son correctos');


        // Mappear el usuario
        return UserMapper.userEntityFromOject(user);
    };


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name, email, password} = registerUserDto;

        try {
            //1. verificar si el correo ya existe
            const emailExist = await UserModel.findOne( {email} )
            if( emailExist ) throw CustomError.badRequest('User already exist');

            const user = await UserModel.create({
                email: email,
                name: name,
                password: this.hashPass(password),
            });


            //2. hash password
            await user.save();


            //3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromOject(user);

        } catch (error) {
            if( error instanceof CustomError ){
                throw error;
            }

            throw CustomError.internalServer();
        }
    }
}


