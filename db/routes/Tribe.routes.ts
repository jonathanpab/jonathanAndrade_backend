import express from 'express';
import {findById} from '../controller/tribe.controller';

export const tribeRouter = express.Router()

tribeRouter.get('/tribe/:id', findById);
