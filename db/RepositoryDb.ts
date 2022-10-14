import {RepositoryDto} from "./model/RepositoryDto";

export interface RepositoryDb {
    findAllByTribe(id: number, response: (err: Error | null, repositoryResponse: RepositoryDto[] | null) => void): void;
}
