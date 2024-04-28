import { Validators } from "../../../config";



export class LoginUserDto{

    private constructor(
        public readonly email:string,
        public readonly password:string,
    ){};


    static create( object: { [key:string]:any } ): [string?, LoginUserDto?]{
        const {email, password} = object;

        if( !email ) return ['email is required'];
        if( !Validators.email.test(email) ) return ['email is not valid'];

        if( !password ) return ['password is required'];
        if( password.length <= 6 ) return ['password is too short'];


        return [undefined, new LoginUserDto( email, password)];
    }


}