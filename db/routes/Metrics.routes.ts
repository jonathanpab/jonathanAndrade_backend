import express from 'express';
import {findByTribe, findByTribeCSV} from '../controller/metrics.controller';

export const metricsRouter = express.Router()

metricsRouter.get('/repositoryMetrics/:id', findByTribe);
metricsRouter.get('/repositoryMetricsCSV/:id', findByTribeCSV);
