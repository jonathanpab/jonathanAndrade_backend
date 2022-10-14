import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {responseVerificationRepository} from "./utilities/responseVerificationRepository";
import cors from "cors"

dotenv.config();

const app: Express = express();
const port = 3000;

app.use(cors({
    origin: '*'
}));

app.get('/', (req: Request, res: Response) => {
    res.send(responseVerificationRepository);
});

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});


/*import { organization } from './db';

(async () => {
  const actors = await organization.findById(
    2006);

  console.log(actors);

  let count: number;
})().then(() => console.log('DONE'));
*/