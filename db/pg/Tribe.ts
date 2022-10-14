import {Pool, QueryResult} from 'pg';
import {TribeDto} from "../model/TribeDto";

export class Tribe {
    #pool: Pool;

    constructor(pool: Pool) {
        this.#pool = pool;
    }

    findById = (id: number, result: (err: Error | null, res: TribeDto[] | null) => void) => {
        this.#pool.query(`SELECT a.id_tribe, a.id_organization, a.name, a.status
                    FROM tribe AS a WHERE a.id_organization = $1`, [id],
            (err, res: QueryResult<TribeDto>) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, Tribe.mapTribeResult(res));
                }
            });
    }

    private static mapTribeResult =
        (res: QueryResult): TribeDto[] =>
            res.rows.map(r => ({
                id_tribe: r.id_tribe,
                id_organization: r.id_organization,
                name: r.name,
                status: r.status,
            }));
}
