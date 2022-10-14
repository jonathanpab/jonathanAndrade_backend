'use strict';

import {organization} from "../index";
import {OrganizationDto} from "../model/OrganizationDto";

export const findById = (req: any, res: any) => {
    organization.findById(req.params.id, (err: Error | null, organizationResponse: OrganizationDto[] | null) => {
        if (err) res.send(err);
        else res.json(organizationResponse);
    })
};

export const findAll = (req: any, res: any) => {
    organization.findAll((err: Error | null, organizationResponse: OrganizationDto[] | null) => {
        if (err) res.send(err);
        else res.json(organizationResponse);
    })
};

export const create = (req: any, res: any) => {
    organization.create(req.body, (err: Error | null, organizationResponse: number | null) => {
        if (err) res.send(err);
        else res.json({error: false, message: "Organization added successfully!", data: organizationResponse});
    });
};

export const update = (req: any, res: any) => {
    organization.update(req.params.id, req.body, (err: Error | null) => {
        if (err) res.send(err);
        else res.json({error: false, message: 'Organization successfully updated'});
    });
};

export const deleteOrganization = (req: any, res: any) => {
    organization.delete(req.params.id, (err: Error | null, response: number | null) => {
        if (err) res.send(err);
        else res.json({error: false, message: 'Organization successfully deleted', data: response});
    });
};
