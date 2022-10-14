import express from 'express';
import {findAllByTribe} from "../controller/repository.controller";

export const repositoryRouter = express.Router()

repositoryRouter.get('/repository/:id', findAllByTribe);
