import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import {responseVerificationRepository} from "./utilities/responseVerificationRepository";
import cors from "cors";
import {router} from "./db/routes/Organization.routes";
import bodyParser from 'body-parser';


dotenv.config();

const app: Express = express();
const port = 3000;

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send(responseVerificationRepository);
});

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});

app.use('/', router)