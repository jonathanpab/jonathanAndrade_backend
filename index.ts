import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import {responseVerificationRepository} from "./utilities/responseVerificationRepository";
import cors from "cors";
import {organizationRouter} from "./db/routes/Organization.routes";
import {tribeRouter} from "./db/routes/Tribe.routes";
import bodyParser from 'body-parser';
import {metricsRouter} from "./db/routes/Metrics.routes";
import {repositoryRouter} from "./db/routes/Repository.routes";


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

app.use('/', organizationRouter)
app.use('/', tribeRouter)
app.use('/', metricsRouter)
app.use('/', repositoryRouter)