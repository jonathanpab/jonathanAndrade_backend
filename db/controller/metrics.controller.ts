'use strict';

import {metrics, tribe} from "../index";
import {isEmpty} from "lodash";
import {MetricsDto} from "../model/MetricsDto";
import {TribeDto} from "../model/TribeDto";
import {json2csvAsync} from "json-2-csv";

export const findByTribe = (req: any, res: any) => {
    tribe.findById(req.params.id, (err: Error | null, tribeResponse: TribeDto[] | null) => {
        if (err) res.send(err);
        else {
            if (isEmpty(tribeResponse)) res.json({message: "La Tribu no se encuentra registrada"})
            else metrics.findByTribe(tribeResponse![0].id_tribe, (err: Error | null, tribeResponse: MetricsDto[] | null) => {
                if (err) res.send(err);
                else if (isEmpty(tribeResponse)) res.json({message: "La Tribu no tiene repositorios que cumplan con la cobertura necesaria"})
                else res.json(tribeResponse);
            })
        }
    })
};

export const findByTribeCSV = (req: any, res: any) => {
    tribe.findById(req.params.id, (err: Error | null, tribeResponse: TribeDto[] | null) => {
        if (err) res.send(err);
        else {
            if (isEmpty(tribeResponse)) res.json({message: "La Tribu no se encuentra registrada"})
            else metrics.findByTribe(tribeResponse![0].id_tribe, async (err: Error | null, tribeResponse: MetricsDto[] | null) => {
                if (err) res.send(err);
                else if (isEmpty(tribeResponse)) res.json({message: "La Tribu no tiene repositorios que cumplan con la cobertura necesaria"})
                else {
                    const csvString = await json2csvAsync(tribeResponse!)

                    console.log(csvString);

                    res.attachment('CustomerData.csv').send(csvString);
                }
            });
        }
    })
};