import {TribeDto} from "./model/TribeDto";

export interface TribeDb {
    findById(id: number, response: (err: Error | null, tribeResponse: TribeDto[] | null) => void): void;
}
