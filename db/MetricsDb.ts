import {MetricsDto} from "./model/MetricsDto";

export interface MetricsDb {
    findByTribe(id: number, response: (err: Error | null, metricsResponse: MetricsDto[] | null) => void): void;
}
