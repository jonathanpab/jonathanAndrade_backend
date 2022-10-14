import express from 'express';
import {create, deleteOrganization, findById, update, findAll} from '../controller/organization.controller';

export const organizationRouter = express.Router()

organizationRouter.post('/addOrganization', create);
organizationRouter.get('/organization/:id', findById);
organizationRouter.get('/organization', findAll);
organizationRouter.put('/editOrganization/:id', update);
organizationRouter.delete('/deleteOrganization/:id', deleteOrganization);
