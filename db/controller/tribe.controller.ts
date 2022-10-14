'use strict';

import {tribe} from "../index";
import {TribeDto} from "../model/TribeDto";
import {isEmpty} from "lodash";

export const findById = (req: any, res: any) => {
    tribe.findById(req.params.id, (err: Error | null, tribeResponse: TribeDto[] | null) => {
        if (err) res.send(err);
        else if (isEmpty(tribeResponse)) res.json({message: "La Tribu no se encuentra registrada"})
        else res.json(tribeResponse);
    })
};