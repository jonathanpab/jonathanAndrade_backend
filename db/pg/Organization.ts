import {Pool, QueryResult} from 'pg';
import {OrganizationDto} from '../model/OrganizationDto'

export class Organization {
    #pool: Pool;

    constructor(pool: Pool) {
        this.#pool = pool;
    }

    findById = (id: number, result: (err: Error | null, res: OrganizationDto[] | null) => void) => {
        this.#pool.query(`SELECT a.id_organization, a.name, a.status
                    FROM organization AS a WHERE a.id_organization = $1`, [id],
            (err, res: QueryResult<OrganizationDto>) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, Organization.mapOrganizationResult(res));
                }
            });
    }

    findAll = (result: (err: Error | null, res: OrganizationDto[] | null) => void) => {
        this.#pool.query(`SELECT * FROM organization AS a`, [],
            (err, res: QueryResult<OrganizationDto>) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, Organization.mapOrganizationResult(res));
                }
            });
    }

    create = (organizationDto: OrganizationDto, result: (err: Error | null, res: number | null) => void): void => {
        this.#pool.query(`INSERT INTO organization (name, status, id_organization) VALUES ($1,$2,$3) RETURNING *`,
            [organizationDto.name, organizationDto.status, organizationDto.id_organization], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res.rowCount);
                }
            }
        );
    }

    update = (id: number, organizationDto: OrganizationDto, result: (err: Error | null, res: number | null) => void): void => {
        this.#pool.query(`
      UPDATE organization
      SET name=$1, status=$2
      WHERE id_organization = $3
    `, [organizationDto.name, organizationDto.status, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res.rowCount);
                }
            });

    }

    delete = (id: number, result: (err: Error | null, res: number | null) => void): void => {
        this.#pool.query(`
      DELETE FROM organization AS a
      WHERE a.id_organization = $1
    `, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res.rowCount);
            }
        });
    }

    private static mapOrganizationResult =
        (res: QueryResult): OrganizationDto[] =>
            res.rows.map(r => ({
                id_organization: r.id_organization,
                name: r.name,
                status: r.status,
            }));
}
