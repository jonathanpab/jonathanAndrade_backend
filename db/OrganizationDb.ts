import {OrganizationDto} from './model/OrganizationDto'

export interface OrganizationDb {
    findById(id: number, response: (err: Error | null, organizationResponse: OrganizationDto[] | null) => void): void;

    findAll(response: (err: Error | null, organizationResponse: OrganizationDto[] | null) => void): void;

    create(organizationDto: OrganizationDto, response: (err: Error | null, organizationResponse: number | null) => void): void;

    update(id:number, organizationDto: OrganizationDto, response: (err: Error | null) => void): void;

    delete(id: number, response: (err: Error | null, response: number | null) => void): void;
}
