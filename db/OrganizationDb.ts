import {OrganizationDto} from './model/OrganizationDto'

export interface OrganizationDb {
    findById(
        id: number): Promise<OrganizationDto[]>
}
