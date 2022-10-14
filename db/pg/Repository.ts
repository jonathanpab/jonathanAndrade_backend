import {Pool, QueryResult} from 'pg';
import {RepositoryDto} from "../model/RepositoryDto";

export class Repository {
    #pool: Pool;

    constructor(pool: Pool) {
        this.#pool = pool;
    }

    findAllByTribe = (id: number, result: (err: Error | null, res: RepositoryDto[] | null) => void) => {
        const date = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        this.#pool.query(`SELECT * FROM repository AS a where id_tribe = $1 and create_time > $2`, [id, date],
            (err, res: QueryResult<RepositoryDto>) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, Repository.mapRepositoryResult(res));
                }
            });
    }

    private static mapRepositoryResult =
        (res: QueryResult): RepositoryDto[] =>
            res.rows.map(r => ({
                id_tribe: r.id_tribe,
                id_repository: r.id_repository,
                name: r.name,
                status: r.status,
                state: r.state,
            }));
}
