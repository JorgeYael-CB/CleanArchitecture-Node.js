import { Server } from "./presentation/server";
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { MongoDatabase } from "./data/mongodb";



(()=>{
    main();
})();


async function main() {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })



    // todo: server start
    new Server({
        port: envs.PORT,
        routes: AppRoutes.Routes,
    }).start();
}