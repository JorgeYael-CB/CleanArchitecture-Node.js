import { Router } from "express";
import express from 'express';
import { AuthRoutes } from "./auth/routes";




export class AppRoutes{

    static get Routes():Router{
        const router = express();
        const authRoutes = AuthRoutes.Routes;


        // Definir todas mis rutas principales
        router.use('/api/auth', authRoutes);


        return router;
    }
}

