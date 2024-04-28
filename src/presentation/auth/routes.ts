import { Request, Response, Router } from "express";
import express from 'express';
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastucture";
import { AuthMiddleware } from "../middlewares/auth.middleware";




export class AuthRoutes{

    static get Routes():Router{
        const router = express();
        const database = new AuthDataSourceImpl()
        const authRepository = new AuthRepositoryImpl( database )
        const authController = new AuthController( authRepository );


        // Definir todas mis rutas principales
        router.post('/register', (req:Request, res:Response) => authController.registerUser(req, res));
        router.post('/login', (req:Request, res:Response) => authController.loginUser(req, res));

        router.get( '/', [AuthMiddleware.ValidateJWT], ( req:Request, res:Response ) => authController.getUsers(req, res) )

        return router;
    }
}

