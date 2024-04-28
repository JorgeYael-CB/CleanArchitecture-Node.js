import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";




export class AuthController{


    // DI
    constructor(
        private readonly authRepository: AuthRepository,
    ){};


    private handleError( error:unknown, res:Response ){
        if( error  instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        console.log(`${error}`) // Winston
        return res.status(500).json({error: 'Internal server error!'});
    };


    registerUser( req:Request, res:Response ){
        const [error, registerUserDto] = RegisterUserDto.create( req.body );
        if( error ) return res.status(400).json( {error} );


        new RegisterUser(this.authRepository)
            .execute( registerUserDto! )
            .then( data => res.status(200).json(data) )
            .catch( error => this.handleError(error, res) );
    };


    loginUser( req:Request, res:Response ){
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if( error ) return res.status(400).json({error});

        this.authRepository.login(loginUserDto!)
            .then( data => res.status(200).json(data) )
            .catch( error => this.handleError(error, res) );
    };


    getUsers( req:Request, res:Response ){
        UserModel.find()
            .then( users => res.json({
                // users,
                user: req.body.user
            }) )
            .catch( error => res.status(500).json({error: 'Internal server error'}) )
    };
};

