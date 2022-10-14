import express from 'express';
import {create, deleteOrganization, findById, update, findAll} from '../controller/organization.controller';

export const router = express.Router()

router.post('/addOrganization', create);
router.get('/organization/:id', findById);
router.get('/organization', findAll);
router.put('/editOrganization/:id', update);
router.delete('/deleteOrganization/:id', deleteOrganization);
