import {Pool, QueryResult} from 'pg';
import {MetricsDto} from "../model/MetricsDto";
import axios from "../../utilities/axios-util";
import {API_ROUTES} from "../routes/Api.routes";
import {VERIFICATION_ENUM} from "../../utilities/verificationEnum";
import {STATE_ENUM} from "../../utilities/stateEnum";

export class Metrics {
    #pool: Pool;

    constructor(pool: Pool) {
        this.#pool = pool;
    }

    findByTribe = (id: number, result: (err: Error | null, res: MetricsDto[] | null) => void) => {
        const ENABLE = "E";
        const date = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        this.#pool.query(`SELECT a.*, b.*, c.name AS tribe, d.name AS organization
                    FROM metrics AS a, repository AS b, tribe AS c, organization AS d
                    WHERE a.id_repository = b.id_repository and c.id_tribe = b.id_tribe and b.id_tribe = $1
                    and d.id_organization = c.id_organization and b.state = $2 and b.create_time > $3 and a.coverage > 75`, [id, ENABLE, date],
            async (err, res: QueryResult<MetricsDto>) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, await Metrics.mapMetricsResult(res));
                }
            });
    }

    private static mapMetricsResult =
        async (res: QueryResult): Promise<MetricsDto[]> => {
            let response = await axios.get(
                API_ROUTES.VERIFICATION_REPOSITORY
            ).then((res) => {
                return res.data;
            });

            return res.rows.map(r => {
                    return {
                        id: r.id_repository,
                        name: r.name,
                        tribe: r.tribe,
                        organization: r.organization,
                        coverage: r.coverage,
                        codeSmells: r.code_smells,
                        bugs: r.bugs,
                        vulnerabilities: r.vulnerabilities,
                        hotspots: r.hotspot,
                        verificationState: VERIFICATION_ENUM[response.repositories.find((x: { id: number; }) => x.id === Number(r.id_repository)).state],
                        state: STATE_ENUM[r.state],
                    };
                }
            );
        }
}
