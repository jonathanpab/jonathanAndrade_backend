import {Pool, QueryResult} from 'pg';
import {OrganizationDto} from '../model/OrganizationDto'

export class Organization {
    #pool: Pool;

    constructor(pool: Pool) {
        this.#pool = pool;
    }

    async findById(
        id: number): Promise<OrganizationDto[]> {
        const res = await this.#pool.query(`
      SELECT a.id_organization,
        a.name,
        a.status
      FROM organization AS a
      WHERE a.id_organization = $1
    `, [id]);

        return Organization.mapOrganizationResult(res);
    }

    private static mapOrganizationResult =
        (res: QueryResult): OrganizationDto[] =>
            res.rows.map(r => ({
                id_organization: r.id_organization,
                name: r.name,
                status: r.status,
            }));
}
