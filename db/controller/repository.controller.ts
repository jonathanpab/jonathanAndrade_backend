'use strict';

import {isEmpty} from "lodash";
import {RepositoryDto} from "../model/RepositoryDto";
import {repository} from "../index";

export const findAllByTribe = (req: any, res: any) => {
    repository.findAllByTribe(req.params.id, (err: Error | null, repositoryResponse: RepositoryDto[] | null) => {
        if (err) res.send(err);
        else if (isEmpty(repositoryResponse)) res.json({message: "La Tribu no tiene repositorios que cumplan con la cobertura necesaria"})
        else res.json(repositoryResponse);
    })
};